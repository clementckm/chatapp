import styled from 'styled-components'

export const ChatHistoryBox = styled.div`
  text-align: left;
  width: 100%;
  height: 620px;
  overflow-y: auto;
`;

export const ChatBox = styled.div`
  padding-top: 7px;
  overflow: auto;
  float: ${props => props.sender === props.userAddress ? 'right' : 'left'};
  clear: both;
`;

export const TimestampBox = styled.div`
  font-size: 13px;
  opacity: 0.7;
  font-style: italic;
`;

export const PayloadBox = styled.div`
  padding: 7px;
  max-width: 300px;
  background-color: ${props=> props.sender === props.userAddress ? '#F44336' : '#8f9696'};
  color: #ffffff;
  border-radius: 5px;
`;

export const SenderBox = styled.div`
  font-size: 13px;
  opacity: 0.7;
  font-style: italic;
`;
export const EndDiv = styled.div`
  clear: both;
`;
