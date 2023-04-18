import { useState } from "react";
import { v4 as uuid } from "uuid";

import { Button, Flex, Box, useToast } from "@chakra-ui/react";
import { Wheel } from "react-custom-roulette";

let LuckyWheel = ({ list, eliminate }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  let toast = useToast();

  list = list.filter((player) => !player.hasWon);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * list.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <Box w="50%" p="5" borderRadius="10px" bg="white" boxShadow="sm">
      <Flex flexDirection="column" alignItems="center">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={list}
          onStopSpinning={() => {
            fetch(
              `http://localhost:3000/api/v1/players/${list[prizeNumber].dbId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ hasWon: true }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                toast({
                  title: `${list[prizeNumber].option} là người chiến thắng.`,
                  status: "success",
                  duration: 800,
                  position: "top",
                });

                eliminate(prizeNumber);
                setMustSpin(false);
              });
          }}
          spinDuration={0.3}
        />
        <Button
          onClick={handleSpinClick}
          mt="5"
          fontSize="xs"
          colorScheme="twitter"
          type="button"
          isDisabled={list.length < 2 || mustSpin}
        >
          Quay ngay!
        </Button>
      </Flex>
    </Box>
  );
};

export default LuckyWheel;
