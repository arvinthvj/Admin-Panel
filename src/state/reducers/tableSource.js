const initialState = [
    {
      key: '0',
      name: 'Murali',
      age: '32',
      batch : "4",
      address: 'Chennai',
    },
    {
      key: '1',
      name: 'Gopi',
      age: '32',
      batch : "4",
      address: 'Tiruppur',
    },
    {
      key: '2',
      name: 'Muthu',
      age: '32',
      batch : "4",
      address: 'Thirupathur',
    },
    {
        key: '3',
        name: 'Murali',
        age: '32',
        batch : "5",
        address: 'Chennai',
      },
      {
        key: '4',
        name: 'Gopi',
        age: '32',
        batch : "6",
        address: 'Tiruppur',
      },
      {
        key: '5',
        name: 'Muthu',
        age: '32',
        batch : "6",
        address: 'Thirupathur',
      },
      {
        key: '6',
        name: 'Gopi',
        age: '32',
        batch : "7",
        address: 'Tiruppur',
      },
      {
        key: '7',
        name: 'Muthu',
        age: '32',
        batch : "7",
        address: 'Thirupathur',
      },
      {
          key: '8',
          name: 'Murali',
          age: '32',
          batch : "7",
          address: 'Chennai',
        },
        {
          key: '9',
          name: 'Gopi',
          age: '32',
          batch : "6",
          address: 'Tiruppur',
        },
        {
          key: '10',
          name: 'Muthu',
          age: '32',
          batch : "6",
          address: 'Thirupathur',
        },
  ];

const tableDataSourceReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "source":
            return action.payload
        default:
            return state
    }
}

export default tableDataSourceReducer;