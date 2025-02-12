import React, {useEffect, useState} from 'react'
import {Blacked} from "../../../../CRM/components/styles";
import {ReactComponent as ModalCloseIcon} from "../../../../assets/HomeTownIcon/ModalCloseIcon.svg";
import styled from "styled-components";
import {API_URL} from "../../../../app/constants/APIKEYS";
import {message, Select, Spin} from "antd";
import {useHomeNoticeInfo} from "../../../hooks/Bigs/GetHomeNoticeInfo";
import {useToken} from "../../../../app/hooks";
import API from "../../../../utils/api";
import TextArea from "antd/es/input/TextArea";
import {useBoardCategoryInfo} from "../../../hooks/Bigs/GetBoardCategoryInfo";
import {media} from "../../../../utils/CalVW";

export const NoticeDetail = ({itemId, setItemId, mutateAdminNoticeList}:any) => {
  const {homeNoticeInfo, isLoading} = useHomeNoticeInfo(itemId);
  const {data: token} = useToken();
  const {boardCategoryInfo} = useBoardCategoryInfo();
  const [isPatch, setIsPatch] = useState<boolean>(false);
  // const [fileInputKey, setFileInputKey] = useState(Date.now()); // 파일 초기화

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [fileList, setFileList] = React.useState<any>([]);


  useEffect(() => {
    if(homeNoticeInfo){
      setTitle(homeNoticeInfo?.title);
      setContent(homeNoticeInfo?.content);
      setCategory(homeNoticeInfo?.boardCategory);
    }
  }, [homeNoticeInfo])


  const UploadData = (file, fileType) => {
    if (!file) {
      message.error("파일을 선택하세요");
      return;
    }

    setFileList([...fileList, { file, fileType }]);
    // setFileInputKey(Date.now())
  };


  const patchNotice = () => {
    const shouldEdit = window.confirm(`수정하시겠습니까?`);

    if (!title || !content) {
      message.error("제목과 내용을 입력하세요.");
      return;
    }

    const formData = new FormData();

    const requestData = {
      title,
      content,
      category
    };

    const jsonBlob = new Blob([JSON.stringify(requestData)], { type: "application/json" });
    formData.append("request", jsonBlob, "request.json");

    if (fileList.length > 0) {
      fileList.forEach((fileObj, index) => {
        formData.append("file", fileObj.file);
      });
    }

    if (shouldEdit) {
      API.postImage('PATCH', `/boards/${itemId}`, token + '', formData)
        .then((res: any) => {
          if (res?.message) {
            message.error(res.message || '실패하였습니다.')
          }
        })
        .catch((err: any) => {
          message.success('등록되었습니다.');
          setItemId(null);
          setIsPatch(false);
          mutateAdminNoticeList();
        })
    }
  }

  return (
    <>
      <Blacked onClick={() => setItemId(null)}/>
      <ModalWrapper className={"scroll-container"}>
        <ModalHeader>
          <ModalTitle>공지사항 상세</ModalTitle>
          <CloseIconSVG as={ModalCloseIcon} onClick={() => {
            setItemId(null)
          }}/>
        </ModalHeader>

        {isLoading ?
          <Spin/>
          :
          <Table>
            <tbody>
            <TableRow>
              <Th>
                <ThLabel>
                  제목
                </ThLabel>
              </Th>
              {isPatch ?
                <Td><Input type="text" value={title} onChange={e => setTitle(e.target.value)}/></Td>
                :
                <Td colSpan={3}>{homeNoticeInfo?.title}</Td>
              }
            </TableRow>
            <TableRow>
              <Th>
                <ThLabel>
                  등록일
                </ThLabel>
              </Th>
              <Td colSpan={3}>{homeNoticeInfo?.createdAt?.split('T')[0]}</Td>
            </TableRow>
            <TableRow>
              <Th>
                <ThLabel>
                  카테고리
                </ThLabel>
              </Th>
              {isPatch ?
                <Td>
                  <Select value={category} onChange={(e) => setCategory(e)} size={'middle'} style={{width:'30%'}} placeholder={'선택하세요.'} >
                    {Object.entries(boardCategoryInfo).map(([key, label]:any) => (
                      <Select.Option key={key} value={key}>
                        {label}
                      </Select.Option>
                    ))}
                  </Select>
                </Td>
              :
                <Td colSpan={3}>{homeNoticeInfo?.boardCategory}</Td>
              }
            </TableRow>
            <TableRow>
              <Th>
                <ThLabel>
                  첨부이미지
                </ThLabel>
              </Th>
              {isPatch ?
                <Td>
                  <FileInput type="file" onChange={({target: {files}}) => {
                    files?.length && UploadData(files[0], 0);
                  }}/>
                </Td>
                :
                <Td colSpan={3}>
                  {homeNoticeInfo?.imageUrl ?
                    <img src={API_URL + homeNoticeInfo?.imageUrl} alt={homeNoticeInfo?.id + homeNoticeInfo?.imageUrl}
                         style={{width: '200px'}}/>
                    :
                    <div>이미지 없음</div>
                  }
                </Td>
              }
            </TableRow>
            <TableRow>
              <Th>
                <ThLabel>
                  내용
                </ThLabel>
              </Th>
              {isPatch ?
                <Td>
                  <TdRowContents>
                    <TextArea value={content} onChange={e => setContent(e.target.value)}/>
                  </TdRowContents>
                </Td>
                :
                <Td colSpan={3}>
                  <div style={{minHeight: 156, display: 'flex', justifyContent: 'space-between', whiteSpace: 'pre-wrap'}}>
                    {homeNoticeInfo?.content}
                  </div>
                </Td>
              }
            </TableRow>
            </tbody>
          </Table>
        }


        <ButtonsWrapper>
          {isPatch ?
            <CancelButton onClick={() => {
              patchNotice();
            }}>
              확인
            </CancelButton>
            :
            <CancelButton onClick={() => setIsPatch(true)} style={{color: 'red', borderColor: 'red'}}>
              수정
            </CancelButton>
          }
        </ButtonsWrapper>
      </ModalWrapper>
    </>
  )
}

const Input = styled.input`
    width: 100%;
    height: 28px;
    padding-left: 10px;
    border: 1px solid #2E2559;
    border-radius: 4px;
    display: flex;
`;

const FileInput = styled.input`
    width: 100%;
    padding: 2px;
    border: 1px solid #2E2559;
    border-radius: 4px;
    display: flex;
`;

const TdRowContents = styled.div`
    display: flex;
    align-items: center;

    font-weight: 400;
    font-size: 14px;
    line-height: 16.71px;
    font-family: Pretendard, sans-serif;
    color: #000000;
`

const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 808px;
    width: 780px;
    background-color: #fff;
    overflow-y: auto;
    border-radius: 8px;
    padding: 24px;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${media.mobile} {
        width: 95%;
        height: 50vh;
    }
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const CloseIconSVG = styled.svg`
    width: 24px;
    cursor: pointer;
`

const ModalTitle = styled.div`
    font-family: Pretendard, sans-serif;
    font-weight: 600;
    font-size: 18px;
    line-height: 21.48px;
    color: #2E2559;
`

const Table = styled.table`
    width: 100%;
    margin-top: 8px;
    border-collapse: collapse;
    border: 1px solid #ccc;
`;

const TableRow = styled.tr`
    min-height: 40px;
`;

const Th = styled.th`
    padding: 10px;
    text-align: left;
    width: 20%;
    border: 1px solid #ccc;
    background-color: #F4F2FF;
    vertical-align: middle;
`;

const ThLabel = styled.div`
    font-family: Pretendard, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 16.71px;
    color: #00000099;

`

const Td = styled.td`
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
`;


const ButtonsWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`


const CancelButton = styled.div`
    width: 100px;
    height: 40px;
    padding: 11px;
    border: 1px solid #000000;
    color: #000000;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    font-size: 15px;
    line-height: 17.9px;
    font-family: Pretendard, sans-serif;
`;
