import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input variant="filled" borderRadius={80} placeholder="Search items..." />
    </InputGroup>
  );
};

export default SearchInput;
