import React from "react";
import { Input, Searchwrapper } from './searchbar.elements';

const SearchPage = (props) => {

  return (
    <>
      <Searchwrapper>
        <form>
          <Input type='text' placeholder='Please enter your key...'>
          </Input>
        </form>
      </Searchwrapper>
    </>
  );
} 

export default SearchPage;