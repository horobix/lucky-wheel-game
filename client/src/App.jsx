import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import randomColor from "randomcolor";

import { Box, Flex, Heading } from "@chakra-ui/react";
import AddPlayer from "./components/AddPlayer";
import LuckyWheel from "./components/LuckyWheel";
import PlayerTabs from "./components/PlayerTabs";

let App = () => {
  let [players, setPlayers] = useState([{ option: "2" }]);
  let [change, setChange] = useState("");

  let eliminate = (playerIndex) => {
    let newPlayers = players.map((player) => {
      if (player.option == players[playerIndex].option) {
        player.hasWon = true;
      }
      return player;
    });
    setPlayers(newPlayers);
  };

  useEffect(() => {
    let executor = async () => {
      fetch("http://localhost:3000/api/v1/players")
        .then((res) => res.json())
        .then((data) => {
          let players = data.map((player) => {
            return {
              dbId: player.id,
              _key: uuid(),
              option: player.fullName,
              hasWon: player.hasWon,
              phoneNumber: player.phoneNumber,
              style: { backgroundColor: randomColor() },
            };
          });

          setPlayers(players);
        });
    };
    executor();
    return;
  }, [change]);

  return (
    <Box w="95%" mx="auto">
      <Heading
        mt="5"
        p="5"
        as="h3"
        size="md"
        borderRadius="10px"
        bg="white"
        boxShadow="sm"
        textTransform="uppercase"
      >
        Trò chơi vòng quay may mắn 🍀 Quay trúng thưởng, phần thưởng to lớn tuyệt vời luôn đó nha 🎉
      </Heading>
      <Flex alignItems="start" gap={5} mt="5">
        <AddPlayer
          list={players}
          changeHandler={(change) => {
            console.log(change);
            setChange(change);
          }}
        />
        <LuckyWheel list={players} eliminate={eliminate} />
        <PlayerTabs list={players} />
      </Flex>
    </Box>
  );
};

export default App;
