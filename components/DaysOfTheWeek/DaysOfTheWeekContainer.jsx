import { useState } from "react";
import {
  Center,
  Text,
  Box,
  SimpleGrid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import DaysOfWeekButton from "./DayOfTheWeekButton";
import LinkButton from "../LinkButton/LinkButton";

export default function DaysOfTheWeekContainer({
  setNumberOfDays,
  saveDataAndLogs,
  customHref,
  disabledDays,
}) {
  // initial state for days of the week has info if it's selected or not (instead of having 2 separate states)
  const [daysOfTheWeek, setDaysOfTheWeek] = useState([
    {
      id: 0,
      day: "Monday",
      isSelected: false,
      isDisable: false,
    },
    {
      id: 1,
      day: "Tuesday",
      isSelected: false,
      isDisable: false,
    },
    {
      id: 2,
      day: "Wednesday",
      isSelected: false,
      isDisable: false,
    },
    {
      id: 3,
      day: "Thursday",
      isSelected: false,
      isDisable: false,
    },
    {
      id: 4,
      day: "Friday",
      isSelected: false,
      isDisable: false,
    },
    {
      id: 5,
      day: "Saturday",
      isSelected: false,
      isDisable: false,
    },
    {
      id: 6,
      day: "Sunday",
      isSelected: false,
      isDisable: false,
    },
  ]);

  // disable days already selected in the previous step by comparing to the props array
  const disableSelectedDaysOnLoad = (days) => {
    days.forEach((day) => {
      daysOfTheWeek.map((item) => {
        if (item.day == day) {
          item.isDisable = true;
        }
      });
    });
  };
  disableSelectedDaysOnLoad(disabledDays);

  // on click, the buttom will change colour and the state will be updated to include selected buttons
  const handleClick = (value) => {
    let updatedData = [...daysOfTheWeek];

    // based on the day name from the value of each button, update the state if selected or unselected
    updatedData.map((item) => {
      if (item.day === value) {
        item.isSelected = item.isSelected ? false : true;
      }
    });
    setDaysOfTheWeek(updatedData);

    // get answer to how many days a week user works
    const workingDaysNumber = updatedData.filter(
      (item) => item.isSelected
    ).length;

    setNumberOfDays(workingDaysNumber);
  };

  // NOTE! I use minW attribute for the Box for now because at the moment the layout component has limitation for width.
  // Please change once Layout is changed

  return (
    <Center
      justify="center"
      borderWidth="2px"
      borderRadius="lg"
      borderColor={["white", "gray.200"]}
      width={["375px", "700px"]}
      height={["516px", "320px"]}
    >
      <Flex direction={"column"}>
        <Flex justify={["center", "left"]}>
          <Text
            fontWeight="500"
            fontSize="18px"
            justify={["center", "left"]}
            mt={["100px", "10px"]}
          >
            Select days of the week *
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ md: 4 }}
          spacingX="15px"
          spacingY="15px"
          py="10"
          textAlign="center"
          // width={["375px", "700px"]}
        >
          {daysOfTheWeek.map((item) => (
            <GridItem key={item.id}>
              <DaysOfWeekButton
                label={item.day}
                isActive={item.isSelected}
                onClick={(value) => handleClick(value)}
                disabled={item.isDisable}
              />
            </GridItem>
          ))}
        </SimpleGrid>
        <Flex justify={["center", "end"]}>
          <LinkButton
            width={["305px", "105px"]}
            height={["60px", "54.37px"]}
            disabled={!daysOfTheWeek.find((item) => item.isSelected)}
            href={customHref}
            // width={"105px"}
            topMargin="0"
            H="55px"
            justifySelf="right"
            onClick={() => {
              setNumberOfDays();
              saveDataAndLogs();
            }}
          >
            Next
          </LinkButton>
        </Flex>
      </Flex>
    </Center>
  );
}
