import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";

import {
  Heading,
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Divider,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

let AddPlayer = ({ list, changeHandler }) => {
  let [change, setChange] = useState(null);
  let fullNameRef = useRef("");
  let phoneNumberRef = useRef("");
  let toast = useToast();

  let addPlayer = () => {
    setChange(new Date().toLocaleString());
  };

  useEffect(() => {
    let executor = async () => {
      let fullName = fullNameRef.current.value;
      let phoneNumber = phoneNumberRef.current.value;
      fullNameRef.current.value = "";
      phoneNumberRef.current.value = "";

      if ((fullName == "" || phoneNumber == "") && change != null) {
        toast({
          title: `Thao tác không thành công`,
          description: `Không đủ thông tin người chơi.`,
          status: "error",
          duration: 2500,
          position: "top-right",
        });
        return;
      }

      if (fullName != "" && phoneNumber != "" && change != null) {
        let newPlayer = {
          fullName: fullName,
          phoneNumber: phoneNumber,
          hasWon: false,
        };

        await fetch("http://localhost:3000/api/v1/players", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPlayer),
        })
          .then((res) => res.json())
          .then((data) => {
            toast({
              title: `Thao tác thành công`,
              description: `Người chơi mới đã được thêm vào danh sách.`,
              status: "success",
              duration: 2500,
              position: "top-right",
            });

            changeHandler(new Date().toString());
          });
      }
    };
    executor();
    return;
  }, [change]);

  return (
    <Box w="25%" h="550px" p="5" borderRadius="10px" bg="white" boxShadow="sm">
      <Heading mb="4" as="h6" size="xs">
        Thêm người chơi mới
      </Heading>
      <FormControl mb="4">
        <FormLabel fontSize="xs">Tên người chơi</FormLabel>
        <Input ref={fullNameRef} fontSize="xs" type="text" />
      </FormControl>
      <FormControl mb="4">
        <FormLabel fontSize="xs">Số điện thoại</FormLabel>
        <Input ref={phoneNumberRef} fontSize="xs" type="number" />
      </FormControl>
      <Button onClick={addPlayer} fontSize="xs" colorScheme="twitter">
        Thêm người chơi
      </Button>
      <Divider my="5" />
      <TableContainer h="200px" overflowY="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize="xs">Người chơi</Th>
              <Th fontSize="xs">Số điện thoại</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((player) => (
              <Tr key={uuid()} fontSize="xs">
                <Td>{player.option}</Td>
                <Td>{player.phoneNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AddPlayer;
