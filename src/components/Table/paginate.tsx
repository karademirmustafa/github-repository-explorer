import { useQuery } from '@apollo/client';
import { useDataDispatch, useDataState } from '../../context/DataContext';
import { SEARCH_USER_OR_REPOSITORY } from '../../services/repository-service/queries';



function Paginate() {
  const dataState = useDataState();
  const dataDispatch = useDataDispatch();

  const { refetch } = useQuery(SEARCH_USER_OR_REPOSITORY, {
    skip: true,
  });
  const total = dataState.tableData.total || 0;
  const pageSize = dataState.tableData.pageSize
  const pageIndex = dataState.tableData.pageIndex
  const endCursor = dataState.tableData.endCursor;
  const stCursor = dataState.tableData.startCursor;
  const hasNextPage = dataState.tableData.hasNextPage;
  const hasPreviousPage = dataState.tableData.hasPreviousPage;


  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, total - 1);

  const handlePageChange = async (pageNumber: number, forward: string) => {
    if (isNaN(pageNumber)) return;

    const query = dataState.tableData.query;
    const options: any = {
      query: query,
      first: pageSize,
    };
    options.after = endCursor;
    options.first = pageSize;

    const { data } = await refetch(options);
    console.log(data)
    const { endCursor: nEndCursor, hasNextPage: nHasNextPage, startCursor, hasPreviousPage } = data.search.pageInfo;
    const repositories = data.search.edges
    dataDispatch({ type: 'UPDATE_REPOSITORIES_DATA', payload: repositories })
    if (data) dataDispatch({ type: 'SET_TABLE_DATA', payload: { ...dataState.tableData, pageIndex: pageNumber, endCursor: nEndCursor, hasNextPage: nHasNextPage, startCursor: startCursor, hasPreviousPage } });

  };

  const handleNextPage = () => {
    if (pageIndex < total / pageSize) {
      handlePageChange(pageIndex + 1, "next");
    }
  };

  // const handlePreviousPage = () => {
  //   if (pageIndex > 1) {
  //     handlePageChange(pageIndex - 1, "previous");
  //   }
  // };



  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      {/* Previous and next button */}

      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-[12px] text-gray-700'>
            <span className='font-medium'>{startIndex + 1}</span> ile{' '}
            <span className='font-medium ml-1'>{endIndex + 1}</span>, arasında ki kayıtlar,{' '}
            <span className='ml-1 font-medium'>{dataState.tableData.total}</span> kayıt bulundu.
          </p>
        </div>

      </div>


      <div>
        {/* <button
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        className={`relative inline-flex items-center px-2 py-2 text-sm font-semibold ${pageIndex === 1
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-900 hover:bg-gray-50 focus:outline-offset-0'
        }`}
      >
        Previous
      </button> */}
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className={`relative inline-flex items-center ml-2 px-2 py-2 text-sm font-semibold ${!hasNextPage
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-900 hover:bg-gray-50 focus:outline-offset-0'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Paginate;