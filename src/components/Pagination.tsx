import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { AbsoluteCenter, Box, Button, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GameQuery } from "../App";

interface Props {
  currentPage: number;
  itemCount: number;
  onSelectedPage: (page: number) => void;
  gameQuery: GameQuery;
}

const Pagination = ({ currentPage = 1, itemCount, onSelectedPage, gameQuery }: Props) => {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [gameQuery]);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  const changePage = (page: number) => {
    setPageNumber(page);
    onSelectedPage(page);
  };

  const pageCount = Math.ceil(itemCount / 20);

  if (pageCount <= 1) return null;

  return (
    <Box position="relative" marginTop={10}>
      <AbsoluteCenter>
        <HStack marginBottom={5}>
          <Button
            leftIcon={<ArrowLeftIcon />}
            isDisabled={pageNumber === 1}
            onClick={() => changePage(1)}
          ></Button>
          <Button
            leftIcon={<ChevronLeftIcon />}
            isDisabled={pageNumber === 1}
            onClick={() => changePage(pageNumber - 1)}
          ></Button>
          <Text>
            Page {pageNumber} of {pageCount}
          </Text>
          <Button
            rightIcon={<ChevronRightIcon />}
            isDisabled={pageNumber === pageCount}
            onClick={() => changePage(pageNumber + 1)}
          ></Button>
          <Button
            rightIcon={<ArrowRightIcon />}
            isDisabled={pageNumber === pageCount}
            onClick={() => changePage(pageCount)}
          ></Button>
        </HStack>
      </AbsoluteCenter>
    </Box>
  );
};

export default Pagination;
