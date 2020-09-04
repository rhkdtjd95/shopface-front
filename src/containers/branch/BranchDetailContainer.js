import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BranchDetailForm from '../../components/branch/BranchDetailForm';
import { checkExpire } from '../../lib/api/common/authAPI';
import {
  branchDelete,
  branchUpdate,
  changeInput,
  getbranchDetail,
  initializeResult,
} from '../../modules/branch/branchDetail';
import { logout } from '../../modules/common/auth';

const BranchDetailContainer = ({ match, history }) => {
  const [error, setError] = useState(null);
  const [zoneCode, setZoneCode] = useState('');
  const [address, setAddress] = useState('');
  const [show, setShow] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const dispatch = useDispatch();

  const { originBranch, branchResult, branchError, user } = useSelector(
    ({ branchDetail, auth }) => ({
      originBranch: branchDetail.originBranch,
      branchError: branchDetail.branchError,
      branchResult: branchDetail.branchResult,
      user: auth.user,
    }),
  );

  const handleComplete = (data) => {
    let value = data.address;
    setAddress(value);
    dispatch(changeInput({ key: 'address', value }));

    value = data.zonecode;
    setZoneCode(value);
    dispatch(changeInput({ key: 'zipCode', value }));

    closeModal();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'licenseImage') {
      setImgFile(e.target.files[0]);
    }
    dispatch(
      changeInput({
        key: name,
        value,
      }),
    );

    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = originBranch;
    if (
      [
        data.name,
        data.phone,
        data.address,
        data.detailAddress,
        data.zipCode,
      ].includes('')
    ) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }

    const branchFormData = new FormData();
    branchFormData.append('name', data.name);
    branchFormData.append('phone', data.phone);
    branchFormData.append('address', data.address);
    branchFormData.append('detailAddress', data.detailAddress);
    branchFormData.append('zipCode', data.zipCode);

    if (imgFile !== null) {
      branchFormData.append('businessLicenseImage', imgFile);
    }

    const no = match.params.no;
    dispatch(branchUpdate({ no, data: branchFormData }));
  };

  const onDelete = () => {
    const no = match.params.no;
    dispatch(branchDelete({ no }));
  };

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });
      const no = match.params.no;
      dispatch(getbranchDetail({ no }));
    }
  }, [dispatch, match.params.no, user]);

  useEffect(() => {
    if (branchResult === 'OK') {
      dispatch(initializeResult());
      history.push('/branch');
    }
  }, [branchResult, history, dispatch]);

  useEffect(() => {
    if (branchError !== null) {
      setError(branchError);
    }
  }, [branchError]);

  return (
    <div>
      <BranchDetailForm
        onSubmit={onSubmit}
        onChange={onChange}
        onDelete={onDelete}
        originBranch={originBranch}
        show={show}
        closeModal={closeModal}
        openModal={openModal}
        zoneCode={zoneCode}
        address={address}
        handleComplete={handleComplete}
        error={error}
      ></BranchDetailForm>
    </div>
  );
};

export default withRouter(BranchDetailContainer);
