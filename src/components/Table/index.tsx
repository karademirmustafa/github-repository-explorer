"use client";

import { useState } from "react";
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa";
import { useMediaQuery } from "@react-hook/media-query";
import TableMobile from "./mobile";
import SearchableText from "./searchable-text";
import { useDataDispatch, useDataState } from "../../context/DataContext";
import { useQuery } from "@apollo/client";
import { SEARCH_USER_OR_REPOSITORY } from "../../services/repository-service/queries";
import Paginate from "./paginate";
interface TablePropsI {
    head: Array<{ width?: string; name: string; secondName?: string; second?: string[]; sortable?: boolean }>;
    body: any;
    searchable: boolean;
}

export default function Table({ head, body, searchable }: TablePropsI) {

    const { refetch } = useQuery(SEARCH_USER_OR_REPOSITORY, {
        skip: true,
    });
    const dataState = useDataState();
    const dataDispatch = useDataDispatch();
    const isMobile = useMediaQuery("(max-width: 600px)");
    const { sort } = dataState.tableData;
    const [search, setSearch] = useState("");

    const filteredData = body?.filter((items: any) =>
        items?.some(
            (item: any) =>
                (item?.key ||
                    item?.props?.searchableText ||
                    item).toString().toLocaleLowerCase("TR").includes(search.toLocaleLowerCase("TR"))
        )
    ).sort((a: any, b: any) => {
        if (sort?.orderBy === "asc") {
            return (
                a[sort.key]?.key ||
                a[sort.key]?.props?.searchableText ||
                a[sort.key]
            ).toString().localeCompare(
                b[sort.key]?.key ||
                b[sort.key]?.props?.searchableText ||
                b[sort.key]
            );
        }
        if (sort?.orderBy === "desc") {
            return (
                b[sort.key].toString().localeCompare(
                    a[sort.key]
                )
            );
        }
    });

    if (!body || body?.length === 0) {
        return (
            <div className="p-4 rounded bg-yellow-100 text-yellow-700 text-sm">
                Gösterilecek veri bulunmuyor.
            </div>
        );
    }

    return (
        <>
            {searchable && (
                <div className="mb-4 flex items-center gap-x-2 ">
                    <select
                        className="inline-flex w-16 text-center h-10 rounded-md text-sm text-gray-900 outline-none focus:border-black border text-sm border-gray-300"
                        value={dataState.tableData.pageSize}
                        onChange={async (e) => {
                            const newPageSize = parseInt(e.target.value);
                            dataDispatch({type:'SET_LOADING',payload:true})
                            const { error, data } = await refetch({
                                query: dataState.tableData.query,
                                first: newPageSize,
                            });
                            const {hasNextPage,endCursor} = data.search.pageInfo;
                            const repositoryCount = data.search.repositoryCount;
                            const repositories = data?.search.edges
                            if (error) {
                                dataDispatch({ type: 'UPDATE_REPOSITORIES_DATA', payload: [] })

                            } else {
                                dataDispatch({ type: 'SET_TABLE_DATA', payload: { ...dataState.tableData, pageSize: newPageSize, pageIndex: 1,total:repositoryCount,hasNextPage,endCursor } });
                                dataDispatch({ type: 'UPDATE_REPOSITORIES_DATA', payload: repositories })
                                dataDispatch({type:'SET_LOADING',payload:false})
                            }

                        }}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search (user/repository) "
                        className="h-10 outline-none focus:border-black border rounded text-sm px-4 w-full border-gray-300"
                    />

                    {sort?.key && (
                        <button
                            onClick={() => dataDispatch({ type: 'SET_TABLE_DATA', payload: { ...dataState.tableData, sort: { key: '', orderBy: 'asc' } } })}
                            className="h-10 rounded whitespace-nowrap border border-red-500 text-red-500 text-sm px-4"
                        >
                            Remove Sort Filter
                        </button>
                    )}
                </div>
            )}
            {isMobile && <TableMobile head={head} body={filteredData} />}
            {!isMobile && (
                <div className="w-full border rounded p-2 text-xs md:overflow-x-auto">
                    <table className="w-full rounded">
                        <thead>
                            <tr>
                                {head.map((h: any, key: number) => (
                                    <th
                                        style={{ width: h?.width || "100px" }}
                                        className={`${key % 2 == 0 ? "bg-gray-50" : "bg-gray-100"
                                            } text-xs font-medium text-gray-800 p-3 border-b border-r`}
                                        key={key}
                                    >
                                        <div className="inline-flex items-center justify-center gap-x-2">
                                            <div className="flex flex-col items-center">
                                                <span className="whitespace-nowrap space-y-2">{h.name}</span>
                                                <span className="whitespace-nowrap text-red-600 ">{h.secondName && h.secondName}</span>

                                            </div>

                                            {h.sortable && (
                                                <button
                                                    onClick={() => {
                                                        if (sort?.key === key) {
                                                            dataDispatch({
                                                                type: 'SET_FILTER_DATA', payload: {
                                                                    ...dataState.filterData, sort: {
                                                                        key,
                                                                        orderBy: sort.orderBy === "asc" ? "desc" : "asc",
                                                                    }
                                                                }
                                                            });


                                                        } else {
                                                            dataDispatch({
                                                                type: 'SET_FILTER_DATA', payload: {
                                                                    ...dataState.filterData, sort: {
                                                                        key,
                                                                        orderBy: "asc",
                                                                    }
                                                                }
                                                            });

                                                        }
                                                    }}
                                                >
                                                    {sort?.key === key && (
                                                        sort.orderBy === "asc" ? <FaSortDown size={14} /> : <FaSortUp size={14} />
                                                    )}
                                                    {sort?.key !== key && <FaSort size={14} />}
                                                </button>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((items: any, key: any) => (
                                <tr
                                    className={`${key % 2 == 0 ? "bg-slate-50" : "bg-gray-200 rounded"
                                        } group`}
                                    key={key}
                                >
                                    {items.map((item: any, key: any) => (
                                        <td
                                            className="p-0 text-center text-xs font-medium text-gray-700 group-hover:bg-slate-700 group-hover:text-white"
                                            key={key}
                                        >
                                            {Array.isArray(item) ? (
                                                <div className="flex gap-x-2.5">
                                                    {item.map((subItem: any, subKey: any) => (
                                                        <SearchableText
                                                            key={subKey}
                                                            searchableText={subItem}
                                                        >
                                                            {subItem}
                                                        </SearchableText>
                                                    ))}
                                                </div>
                                            ) : (
                                                <SearchableText
                                                    searchableText={item}
                                                >
                                                    {item}
                                                </SearchableText>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}

                        </tbody>

                    </table>
{!filteredData.length && <div className="mt-5 mx-auto text-center">no users and repositories found with the keyword you searched for</div> }
                </div>
            )}
            <Paginate />
        </>
    );
}
