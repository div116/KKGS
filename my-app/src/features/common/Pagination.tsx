import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Items_Per_Page } from "../../app/constant";

const Pagination = ({ page, totalPages, handlepageChange, totalItems }: any) => {
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div  style={{ cursor: 'pointer' }} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
           onClick={() => handlepageChange(page - 1> 0 ? page - 1 : 1)}>
            Previous
          </div>
          <div style={{ cursor: 'pointer' }} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
           onClick={() => handlepageChange(totalPages > page ? page + 1 : page)}>
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * Items_Per_Page + 1}</span> to <span className="font-medium">{page * Items_Per_Page > totalItems ? totalItems : page * Items_Per_Page}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <div  style={{ cursor: 'pointer' }} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
               onClick={() => handlepageChange(page - 1> 0 ? page - 1 : 1)}>
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-teal-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {
                totalPages > 0 && [...Array(totalPages)].map((_, index) => (
                  <div
                    onClick={() => handlepageChange(index + 1)}
                    style={{ cursor: 'pointer' }}
                    key={index}
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center ${index + 1 === page ? 'bg-teal-600 text-white' : 'text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600`}
                  > {index + 1} </div>
                ))
              }
  
              <div  style={{ cursor: 'pointer' }} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
               onClick={() => handlepageChange(totalPages > page ? page + 1 : page)}>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  export default Pagination
