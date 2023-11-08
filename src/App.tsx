import Table from "./components/Table";
import { useDataDispatch, useDataState } from "./context/DataContext";
import Modals from "./components/Modal"
import Search from "./components/Search";
import SearchableTextComponent from "./components/Table/searchable-text";
import { useEffect } from "react";
function App() {


  const tableHead = (): Array<{ width?: string; name: string; secondName?: string; second?: string[]; sortable?: boolean }> => {
    return [
      { name: 'User' },
      { name: 'Repository Name ' },
      // { name: 'Star', sortable: true },
      // {
      //   name: 'Watchers',
      //   sortable: true
      // },
      // { name: 'Primary Language', sortable: true },
      // { name: 'Forks' },
      { name: "Action" }

    ];
  };
  const dataState = useDataState();
  const dataDispatch = useDataDispatch();
  const repositories = dataState.repositories;

  const loading=dataState.loading;

  const onModalOpen = (name: string) => {
    dataDispatch({ type: 'SET_MODAL_OPEN', payload: { name: name, open: true } });
  }

  console.log(loading,"loading")
  return (
    
    <div className="container mx-auto">
      <h3 className="my-4 mx-4 text-3xl">Github Explorer</h3>
      <Search />
      {loading && <div>Loading...</div>}
      {repositories.length > 0 && !loading && <Table
        searchable={true}

        body={repositories?.map((data: any, key:number) => [
          <SearchableTextComponent searchableText={data?.node?.owner?.login}>
            
            {data?.node?.owner?.login}
          </SearchableTextComponent>,
          <SearchableTextComponent searchableText={data?.node?.name}>
            
           {data?.node?.name}
          </SearchableTextComponent>,
          // <div>{data?.star}</div>,
          // <div>{data?.watchers}</div>,
          // <div>{data?.primaryLanguage}</div>,
          // <div>{data?.forks}</div>,
          <button onClick={() => onModalOpen(data?.node?.name)}>View Details</button>
        ])
        }
        head={tableHead()}
      />}
      {repositories.length <1 && !loading && dataState.tableData.query && <div>No users or repositories found for <span className="font-bold">{dataState.tableData.query}</span></div>}
        
      {dataState.modalOpen.open && <Modals />}


    </div>
  )
}

export default App
