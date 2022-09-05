import Header from "../components/Header";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { DateRange } from "react-date-range";
import SearchItem from "../components/searchItem/SearchItem";

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const ListWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  gap: 20px;
`;
const ListSearch = styled.div`
  flex: 1;
  background-color: #f50057;
  padding: 10px;
  border-radius: 10px;
  position: sticky;
  top: 20px;
  height: max-content;
`;
const ListResult = styled.div`
  flex: 3;
`;
const ListTitle = styled.h1`
  font-size: 20px;
  color: #16213e;
  margin-bottom: 10px;
`;
const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;
const ListItemOption = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #555;
  font-size: 12px;
  gap: 5px;
`;
const ListLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
`;
const ListInput = styled.input`
  height: 30px;
  border: none;
  padding: 5px;
  outline: none;
`;
const ListOptionInput = styled.input`
  width: 50px;
  height: 30px;
`;

const ListItemSpan = styled.span`
  height: 30px;
  padding: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  flex: 1;
`;

const ListAllItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;
const ListItemContainer = styled.div`
  padding: 10px;
`;

const ListSearchButton = styled.button`
  padding: 10px;
  background-color: #16213e;
  color: white;
  border: none;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
`;

const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [roomOptions, setRoomOptions] = useState(location.state.roomOptions);

  return (
    <>
      <Navbar />
      <Header type="list" />
      <ListContainer>
        <ListWrapper>
          <ListSearch>
            <ListTitle>Search</ListTitle>
            <ListItem>
              <ListLabel>Destination</ListLabel>
              <ListInput placeholder={destination} type="text" />
            </ListItem>
            <ListItem>
              <ListLabel>Check-in Date</ListLabel>
              {/* <ListInput type="text" /> */}
              <ListItemSpan onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </ListItemSpan>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </ListItem>
            <ListAllItems>
              <ListLabel>Options</ListLabel>
              <ListItemContainer>
                <ListItemOption>
                  <ListItemSpan>
                    Min price &nbsp; <small> per night</small>
                  </ListItemSpan>
                  <ListOptionInput type="number" />
                </ListItemOption>
                <ListItemOption>
                  <ListItemSpan>
                    Max price &nbsp; <small> per night</small>
                  </ListItemSpan>
                  <ListOptionInput type="number" />
                </ListItemOption>
                <ListItemOption>
                  <ListItemSpan>Adults</ListItemSpan>
                  <ListOptionInput
                    type="number"
                    min={1}
                    placeholder={roomOptions.adult}
                  />
                </ListItemOption>
                <ListItemOption>
                  <ListItemSpan>Children</ListItemSpan>
                  <ListOptionInput
                    type="number"
                    min={0}
                    placeholder={roomOptions.children}
                  />
                </ListItemOption>
                <ListItemOption>
                  <ListItemSpan>Rooms</ListItemSpan>
                  <ListOptionInput
                    type="number"
                    min={1}
                    placeholder={roomOptions.room}
                  />
                </ListItemOption>
              </ListItemContainer>
            </ListAllItems>
            <ListSearchButton>Search</ListSearchButton>
          </ListSearch>
          <ListResult>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </ListResult>
        </ListWrapper>
      </ListContainer>
    </>
  );
};
export default HotelList;
