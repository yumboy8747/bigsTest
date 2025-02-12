import React, {useState} from 'react'
import {Display} from "../../../CRM/organism/Main/styles";
import {AdminNoticeTable} from "./AdminNoticeTable";
import styled from "styled-components";
import {useAdminNoticeList} from "../../hooks/Bigs/GetAdminNoticeList";
import {RegistNotice} from "./blocks/RegistNotice";


export const AdminNotice = () => {
  // 페이지네이션
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // 유틸리티
  const [registNoticeModal, setRegistNoticeModal] = useState(false);

  // 데이터 조회
  const {
    adminNoticeList,
    mutateAdminNoticeList, total, isLoading
  } = useAdminNoticeList(page, pageSize);


  return (
    <Display>

      <RegistSection>
        <RegistSaleButton onClick={() => setRegistNoticeModal(true)}>게시판 등록</RegistSaleButton>
      </RegistSection>


      <AdminNoticeTable
        mutateAdminNoticeList={mutateAdminNoticeList}
        adminNoticeList={adminNoticeList}
        total={total}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLoading={isLoading}
      />

      {registNoticeModal && <RegistNotice setRegistNoticeModal={setRegistNoticeModal} mutateAdminNoticeList={mutateAdminNoticeList} />}
    </Display>
  )
}

const RegistSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const RegistSaleButton = styled.div`
    background-color: #530DAD;
    box-shadow: 0px 0px 10px 0px #0000000D;
    height: 42px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    padding-inline: 10px;

    font-weight: 600;
    font-size: 15px;
    line-height: 17.9px;
    font-family: Pretendard, sans-serif;
`
