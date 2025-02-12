import React, {useEffect, useState} from 'react'
import {Blacked} from "../../../../CRM/components/styles";
import {ReactComponent as ModalCloseIcon} from "../../../../assets/HomeTownIcon/ModalCloseIcon.svg";
import styled from "styled-components";
import {message, Select} from "antd";
import API from "../../../../utils/api";
import 'firebase/compat/auth';
import TextArea from "antd/es/input/TextArea";
import {useToken} from "../../../../app/hooks";
import {useBoardCategoryInfo} from "../../../hooks/Bigs/GetBoardCategoryInfo";
import {media, useIsMobile} from "../../../../utils/CalVW";


export const RegistNotice = ({setRegistNoticeModal, mutateAdminNoticeList}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [fileList, setFileList] = React.useState<any>([]);

  // 유틸리티
  // const [fileInputKey, setFileInputKey] = useState(Date.now()); // 파일 초기화
  const isMobile = useIsMobile();


  // 데이터 조회
  const {data: token} = useToken();
  const {boardCategoryInfo} = useBoardCategoryInfo();

  useEffect(() => {
    console.log('boardCategoryInfo', Object.entries(boardCategoryInfo))
  }, [boardCategoryInfo]);


  const UploadData = (file, fileType) => {
    if (!file) {
      message.error("파일을 선택하세요");
      return;
    }

    setFileList([...fileList, { file, fileType }]);
  };


  const postNotice = () => {
    const shouldEdit = window.confirm(`공지사항을 등록하시겠습니까?`);

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
      API.postImage('POST', '/boards', token + '', formData)
        .then((res: any) => {
          if (res?.id) {
            message.success('등록되었습니다.');
            setRegistNoticeModal(false);
            mutateAdminNoticeList();
          } else {
            message.error(res.message || '실패하였습니다.')
          }
        })
        .catch((err: any) => {
          message.error('실패하였습니다.')
        })
    }
  }




  return (
    <>
      <Blacked onClick={() => setRegistNoticeModal(false)}/>
      <ModalWrapper className={"scroll-container"}>
        <ModalHeader>
          <ModalTitle>게시판 등록</ModalTitle>
          <CloseIconSVG as={ModalCloseIcon} onClick={() => {
            setRegistNoticeModal(false)
          }}/>
        </ModalHeader>

        <Table>
          <tbody>
          <TableRow>
            <Th>
              <ThLabel>
                제목
              </ThLabel>
            </Th>
            <Td><Input type="text" value={title} onChange={e => setTitle(e.target.value)}/></Td>
          </TableRow>
          <TableRow>
            <Th>
              <ThLabel>
                카테고리
              </ThLabel>
            </Th>
            <Td>
              <Select onChange={(e) => setCategory(e)} size={'middle'} style={{width:isMobile ? '50%' : '30%'}} placeholder={'선택하세요.'} >
                {Object.entries(boardCategoryInfo).map(([key, label]:any) => (
                  <Select.Option key={key} value={key}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Td>
          </TableRow>
          <TableRow>
            <Th>
              <ThLabel>
                첨부파일
              </ThLabel>
            </Th>
            <Td>
              <FileInput type="file" onChange={({target: {files}}) => {
                files?.length && UploadData(files[0], 0);

              }}/>
              {/*{fileList?.map((item: any, index: number) => (*/}
              {/*  <DescText>*/}
              {/*    {item?.name}*/}
              {/*    <DeleteItemIconSVG as={ModalCloseIcon} onClick={() => DeleteFileListData(item?.name, index)}/>*/}
              {/*  </DescText>*/}
              {/*))}*/}
            </Td>
          </TableRow>
          <TableRow>
            <Th>
              <ThLabel>
                내용
              </ThLabel>
            </Th>
            <Td>
              <TdRowContents>
                <TextArea value={content} onChange={e => setContent(e.target.value)}/>
              </TdRowContents>
            </Td>
          </TableRow>
          </tbody>
        </Table>

        <SignUpButton onClick={() => postNotice()}>
          등록
        </SignUpButton>
      </ModalWrapper>
    </>
  )
}

const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 800px;
    width: 700px;
    min-height: 411px;
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

const DeleteItemIconSVG = styled.svg`
    width: 12px;
    cursor: pointer;
    margin-left: 10px;
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
    margin-top: 20px;
    border-collapse: collapse;
    border: 1px solid #ccc;
`;

const TableRow = styled.tr`
    min-height: 40px;
`;

const Th = styled.th`
    padding: 10px;
    text-align: left;
    width: 13%;
    border: 1px solid #ccc;
    background-color: #F4F2FF;
`;

const ThLabel = styled.div`
    font-family: Pretendard, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 16.71px;
    color: #00000099;
    display: flex;
    gap: 2px;
`

const RequireIcon = styled.p`
    color: #F15151;
`

const Td = styled.td`
    padding: 10px;
    text-align: left;
    width: 78%;
    border: 1px solid #ccc;
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

const DescText = styled.div`
    font-weight: 400;
    font-size: 14px;
    font-family: Pretendard, sans-serif;
    line-height: 16.71px;
    color: #000000;
    margin-top: 8px;
    margin-bottom: 20px;
    white-space: pre-wrap;
`

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

const GreyButton = styled.div`
    height: 31px;
    width: 120px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0000001A;
    cursor: pointer;
    color: #000000CC;
    margin: 0 4px;

    font-size: 14px;
    font-weight: 500;
    line-height: 16.71px;
`

const StyledSelect = styled(Select)`
    width: 160px;
    border: 1px solid #00000033;
    border-radius: 7px;
`

const SignUpButton = styled.div`
    width: 100px;
    padding: 11px;
    color: #125DE6;
    border: 1px solid #0000004D;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    font-size: 15px;
    line-height: 17.9px;
    font-family: Pretendard, sans-serif;
`;