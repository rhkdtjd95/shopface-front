import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EmployListForm from '../../components/employ/EmployListForm';
import { getEmployList } from '../../modules/employ/employList';
import { checkExpire } from '../../lib/api/common/authAPI';
import { logout } from '../../modules/common/auth';
import {
  changeInput,
  postEmploy,
  initializeForm,
} from '../../modules/employ/employPost';

const EmployListContainer = ({ history, match }) => {
  const [show, setShow] = useState(false);
  const [filterEmploys, setFilterEmploys] = useState(null);
  const [error, setError] = useState(null);
  const [checked, setChecked] = useState(false);
  const [employFilt, setEmployFilt] = useState(null);

  const closeModal = () => setShow(false);
  const openModal = () => {
    const filterBranch = branchs.filter(
      (branch) => branch.no === parseInt(selectedBranch),
    );

    if (filterBranch.length > 0) {
      if (filterBranch[0].state === 'N') {
        alert('현재 사업장이 승인되지 않은 상태입니다.');
        return;
      }
    }

    setShow(true);
  };

  const dispatch = useDispatch();
  const {
    employs,
    employPost,
    postResult,
    postError,
    user,
    name,
    branchs,
    selectedBranch,
  } = useSelector(
    ({ employList, employPost, loading, auth, branchList, branchSelect }) => ({
      employs: employList.employs,
      employPost: employPost.post,
      postResult: employPost.postResult,
      postError: employPost.postError,
      user: auth.user,
      name: employPost.post.name,
      branchs: branchList.branchs,
      selectedBranch: branchSelect.selectedBranch,
    }),
  );

  const onCheck = (e) => {
    const {
      target: { checked },
    } = e;
    setChecked({ checked });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInput({
        key: name,
        value,
      }),
    );
  };

  const onSearch = () => {
    const searchName = name;
    const filterEmploys = employs.filter((employ) =>
      employ.name.toLowerCase().includes(searchName),
    );
    setFilterEmploys(filterEmploys);
  };
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const onSubmit = (e) => {
    closeModal();
    e.preventDefault();
    const data = employPost;
    if ([data.name, data.email].includes('')) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    setError(null);
    dispatch(
      postEmploy({
        post: {
          name: data.name,
          email: data.email,
          branchNo: selectedBranch,
        },
      }),
    );
  };

  useEffect(() => {
    if (postResult === 'OK') {
      alert('근무자에게 초대 메시지를 전송하였습니다.');
      dispatch(initializeForm());
      dispatch(getEmployList({ selectedBranch }));
    }
  }, [postResult, dispatch, selectedBranch]);

  useEffect(() => {
    if (postError !== null) {
      setError('등록에 실패 했습니다.');
    }
  }, [postError]);

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });

      if (selectedBranch === '') {
        alert('사업장을 등록해주세요');
        history.push('/branch');

        return;
      }
      dispatch(getEmployList({ selectedBranch }));
      dispatch(initializeForm('post'));
    }
  }, [dispatch, selectedBranch, user, history]);

  // useEffect(() => {
  //   const employsFilter = employs.filter((employ) => employ.state !== 'D');
  //   setEmployFilt(employsFilter);
  // }, [dispatch, employs, selectedBranch]);

  return (
    <EmployListForm
      employs={employs}
      employFilt={employFilt}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      onSearch={onSearch}
      onKeyPress={onKeyPress}
      filterEmploys={filterEmploys}
      show={show}
      closeModal={closeModal}
      openModal={openModal}
      onCheck={onCheck}
      checked={checked}
    ></EmployListForm>
  );
};

export default withRouter(EmployListContainer);
