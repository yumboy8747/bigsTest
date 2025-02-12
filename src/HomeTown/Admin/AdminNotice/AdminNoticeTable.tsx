import React, {useState, useEffect} from 'react'
import {Table, Checkbox, message, Button} from 'antd'
import styled from "styled-components";
import {useToken} from "../../../app/hooks";
import {NoticeDetail} from "./blocks/NoticeDetail";
import API from "../../../utils/api";


export const AdminNoticeTable = ({
                                   adminNoticeList,
                                   mutateAdminNoticeList,
                                   total,
                                   page,
                                   setPage,
                                   pageSize,
                                   setPageSize,
                                   isLoading,
                                 }) => {

  const [itemId, setItemId] = useState(null);
  const {data: token} = useToken();


  // 페이지네이션을 위한 기능
  const handleTableChange = (pagination) => {
    setPage(pagination.current - 1);
    setPageSize(pagination.pageSize);
  };


  // 게시판 삭제
  const deleteBoard = (id) => {
    const isConfirm = window.confirm('삭제하시겠습니까?');

    if(isConfirm){
      API.delete(`/boards/${id}`, token+'', {

      }).then((res:any) => {
        if(res.message){
          message.error(res.message || '실패하였습니다.')
        }
      }).catch((err:any) => {
        message.success('삭제하였습니다.');
        mutateAdminNoticeList();
      })
    }
  }

  // 테이블 컬럼
  const customerColumns = [
    {
      dataIndex: 'id',
      title: 'id'
      ,
      render: (value, data) => {
        return (
          <div className='No.' style={{justifyContent: 'center', display: 'flex'}}>{data?.id || '-'}</div>
        )
      }
    },
    {
      dataIndex: 'title',
      title: '제목',
      render: (value, data) => {
        return (
          <div
            className='email' style={{justifyContent: 'center', display: 'flex', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}
            onClick={() => setItemId(data.id)}
          >{value || '-'}</div>
        )
      }
    },
    {
      dataIndex: 'category',
      title: '카테고리',
      render: (value) => {
        return (
          <div className='No.' style={{justifyContent: 'center', display: 'flex'}}>{value || '-'}</div>
        )
      }
    },
    {
      dataIndex: 'createdAt',
      title: '등록일',
      render: (value) => {
        const formattedDate = value?.split('T')[0];
        return (
          <div className='date' style={{justifyContent: 'center', display: 'flex'}}>{formattedDate}</div>
        )
      }
    },
    {
      dataIndex: '',
      title: ' ',
      render: (value, data) => {

        return (
         <div style={{display: 'flex', justifyContent: 'center'}}>
           <Button onClick={() => deleteBoard(data?.id)} style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold'}}>삭제</Button>
         </div>
        )
      }
    }
  ];


  return (
    <DBFilterWrapper>

      <StyleTable columns={customerColumns}
                  dataSource={adminNoticeList}
                  bordered={true}
                  loading={isLoading}
                  pagination={{
                    current: page + 1,
                    pageSize: pageSize,
                    total: total,
                  }}
                  onChange={handleTableChange}
      />

      {itemId !== null && <NoticeDetail itemId={itemId} setItemId={setItemId} mutateAdminNoticeList={mutateAdminNoticeList}/>}

    </DBFilterWrapper>
  )
}

export default React.memo(AdminNoticeTable);

const DBFilterWrapper = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 2px 2px 8px 2px #74747476;
    padding: 28px;
    .ant-table-content {
        font-family: 'Pretendard';
        .ant-table-thead > tr > th {
            text-align: center;
        }
        .name, .tel, .date, .manager, .platform, .path {
            text-align: center;
        }
        .money {
            text-align: right;
        }
    }
    .DBTable {
        .ant-table-tbody > tr > td {
            padding: 0;
            vertical-align: middle;
            > div {
                height: 43px !important;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
    .BoardTable {
        .ant-table-thead > tr > th {
            &:first-child {
                width: 50px;
            }
        }
        .ant-table-tbody > tr {
            &.answered {
                color: red !important;
                font-weight: 600 !important;
                text-decoration: line-through !important;
                > .ant-table-cell-row-hover {
                    background-color: #db969692;
                }
            }
            &.hold {
                color: blue !important;
                font-weight: 600 !important;
                > .ant-table-cell-row-hover {
                    background-color: #96b2db92;
                }
            }
        }
        .ant-table-tbody > tr > td {
            &:nth-child(4) {
                width: 230px;
                text-decoration: underline;
                cursor: pointer;
            }
            > div {
                display: flex;
                align-items: center;
                justify-content: center;
                &.request {
                    width: 230px;
                    justify-content: flex-start;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .ant-pagination {
        justify-content: center;
    }
`

const StyleTable = styled(Table)`
    .ant-table-thead > tr > th {
        background-color: #F4F2FF;
        color: #00000099;
        font-size: 14px;
        font-weight: 500;
        line-height: 16.71px;
    }
`
