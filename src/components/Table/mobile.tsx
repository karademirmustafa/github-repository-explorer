
interface TableMobilePropsI {
  head: Array<{ width?: string; name: string; secondName?: string; second?: string[]; sortable?: boolean }>;
  body: any[];
}

export default function TableMobile({ head, body }: TableMobilePropsI) {


  return (
    <div className="border rounded p-4 md:p-4 grid divide-y gap-y-4">
      {body.map((items, rowIndex) => (
        <section
          className={`pt-0 px-4 first:pt-0 grid gap-y-2 ${rowIndex % 2 === 0 ? 'bg-gray-200' : 'bg-white'
            }`}
        >
          {items.map((item: any, columnIndex: number) => {
            const header = head[columnIndex];
            const itemComponent = Array.isArray(item) ? (
              <div className="grid grid-cols-2 text-sm gap-x-4 ">

                {item}
              </div>
            ) : (
              <div className="text-sm flex items-center gap-x-6">

                <div className="inline-flex items-center justify-center gap-x-2">
                  <div className="flex flex-col items-start">
                    <h6 className="min-w-[65px] text-xs font-semibold text-gray-500 ">
                      {header.name}
                    </h6>
                    <span className={`whitespace-nowrap text-red-600 ${header.secondName ? '' : 'hidden'}`}>{header.secondName}</span>
                   
                  </div>
                </div>
                {item}
              </div>
            );

            return itemComponent;
          })}


        </section>
      ))}
    </div>
  );
}
