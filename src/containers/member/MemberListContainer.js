import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MemberListForm from '../../components/member/MemberListForm';
import { checkExpire } from '../../lib/api/common/authAPI';
import { logout } from '../../modules/common/auth';
import { changeInput, getMemberList } from '../../modules/member/memberList';

const MemberListContainer = ({ history }) => {
  const [filterMembers, setFilterMembers] = useState(null);
  const dispatch = useDispatch();
  const { members, memberError, loading, user, name } = useSelector(
    ({ memberList, loading, auth }) => ({
      members: memberList.members,
      memberError: memberList.memberError,
      name: memberList.name,
      loading: loading,
      user: auth.user,
    }),
  );

  const onChange = (e) => {
    const value = e.target.value;
    dispatch(changeInput(value));
  };

  const onSearch = () => {
    const searchName = name;
    const filterMembers = members.filter((member) =>
      member.name.toLowerCase().includes(searchName),
    );

    setFilterMembers(filterMembers);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  useEffect(() => {
    if (user !== null) {
      checkExpire().then((isExpired) => {
        if (isExpired) {
          dispatch(logout());
        }
      });
      dispatch(getMemberList());
    }
  }, [dispatch, user]);

  return (
    <MemberListForm
      members={members}
      memberError={memberError}
      loading={loading}
      onChange={onChange}
      onSearch={onSearch}
      onKeyPress={onKeyPress}
      filterMembers={filterMembers}
    ></MemberListForm>
  );
};

export default withRouter(MemberListContainer);
