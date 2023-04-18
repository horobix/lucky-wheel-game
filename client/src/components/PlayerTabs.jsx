import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

let PlayerTabs = ({ list }) => {
  return (
    <Box w="25%" p="5" borderRadius="10px" bg="white" boxShadow="sm">
      <Tabs>
        <TabList>
          <Tab fontSize="xs" fontWeight="semibold">
            Người chơi còn lại
          </Tab>
          <Tab fontSize="xs" fontWeight="semibold">
            Người chơi đã thắng
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel fontSize="xs">
            {list.map((player) => {
              if (!player.hasWon)
                return (
                  <Text
                    key={uuid()}
                    p="2"
                    my="4"
                    fontWeight="semibold"
                    borderRadius="5px"
                    bg="gray.200"
                  >
                    {player.option}
                  </Text>
                );
            })}
          </TabPanel>
          <TabPanel fontSize="xs">
            {list.map((player) => {
              if (player.hasWon)
                return (
                  <Text
                    key={uuid()}
                    p="2"
                    my="4"
                    fontWeight="semibold"
                    borderRadius="5px"
                    bg="gray.200"
                  >
                    {player.option}
                  </Text>
                );
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PlayerTabs;
