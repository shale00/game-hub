import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  page: number;
  currentPage: number;
  itemCount: number;
}

const Pagination = ({ page, currentPage, itemCount }: Props) => {
  const [pageNumber, setPageNumber] = useState("");

  const pageCount = Math.ceil(itemCount / 10);

  if (pageCount <= 1) return null;

  return (
    <Box position="relative" marginTop={10}>
      <AbsoluteCenter>
        <HStack marginBottom={5}>
          <Button
            leftIcon={<ArrowLeftIcon />}
            isDisabled={currentPage === 1}
          ></Button>
          <Button
            leftIcon={<ChevronLeftIcon />}
            isDisabled={currentPage === 1}
          ></Button>
          <Text>
            Page {currentPage} of {pageCount}
          </Text>
          <Button
            rightIcon={<ChevronRightIcon />}
            isDisabled={currentPage === pageCount}
          ></Button>
          <Button
            rightIcon={<ArrowRightIcon />}
            isDisabled={currentPage === pageCount}
          ></Button>
        </HStack>
      </AbsoluteCenter>
    </Box>
  );
};

export default Pagination;
