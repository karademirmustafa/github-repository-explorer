import { useQuery } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SEARCH_USER_OR_REPOSITORY } from '../../services/repository-service/queries';
import { useDataDispatch, useDataState } from '../../context/DataContext';

type SearchFormValues = {
    query: string;
};

const SearchSchema = Yup.object().shape({
    query: Yup.string().required('Search keyword required'),
});

const Search:React.FC = () => {
    const dataState = useDataState();
    const { refetch } = useQuery(SEARCH_USER_OR_REPOSITORY, {
        skip: true,
    });

    const dataDispatch = useDataDispatch();

    const handleSubmit = async (values: SearchFormValues) => {
        try {
            const { loading, error, data } = await refetch({
                query: values.query,
                first: dataState.tableData.pageSize,
            });

            dataDispatch({type:'SET_LOADING',payload:true});
            
            if (loading) {
                console.log("Sorgu yükleniyor...");
                dataDispatch({type:'SET_LOADING',payload:true})
            }

            if (error) {
                console.error("Sorgu hatası:", error);
                dataDispatch({type:'SET_LOADING',payload:false})
            }

            if (data) {
                console.log("Sorgu sonuçları:", data.search.edges);
                const {hasNextPage,endCursor} = data.search.pageInfo;
                const repositoryCount = data.search.repositoryCount;
                const repositories = data.search.edges


                dataDispatch({ type: 'UPDATE_REPOSITORIES_DATA', payload: repositories });
                dataDispatch({type:'SET_TABLE_DATA',payload:{...dataState.tableData,query:values.query,total:repositoryCount,hasNextPage,endCursor}})
                dataDispatch({type:'SET_LOADING',payload:false})
            }

            console.log(loading,error,data,"dsad")

        } catch (error) {
            console.error("Sorgu hatası:", error);
        }
    };

    return (
        <div className="p-4">
            <Formik
                initialValues={{ query: '' }}
                validationSchema={SearchSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="relative text-gray-600">
                        <Field
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                            type="search"
                            id="search-input"
                            name="query"
                            placeholder="Search .."
                        />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <svg
                                className="text-gray-600 h-4 w-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 56.966 56.966"
                            >
                            </svg>
                        </button>
                    </div>
                    <ErrorMessage name="query" component="div" className="text-red-500" />
                </Form>
            </Formik>
        </div>
    );
};

export default Search;
