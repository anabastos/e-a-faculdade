import React from 'react';

const List = (props) => {
  const wikis = props.wiki.map((wiki, i) => {
    return (
      <li className={'row'} key={i}>
        {wiki}
      </li>
    );
  });

  return <ul> {wikis} </ul>;
};

export default List;
