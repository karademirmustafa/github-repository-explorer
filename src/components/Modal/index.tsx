import ReactModal from 'react-modal';
import { useDataDispatch, useDataState } from '../../context/DataContext';



const Modals = () => {
    const dataDispatch = useDataDispatch();
    const dataState = useDataState();
    const { name, open } = dataState.modalOpen;
    console.log(dataState,"DATA")
    const filteredData = dataState?.repositories?.find(item => {
        return item.node.name === name;
    });

    const onRequestClose = () => {
        dataDispatch({ type: 'SET_MODAL_OPEN', payload: { name, open: false } })
    }


    return (
        <ReactModal
            isOpen={open && filteredData}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            style={{
                overlay: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                content: {
                  position: 'relative',
                  top: 'auto',
                  left: 'auto',
                  right: 'auto',
                  bottom: 'auto',
                  border: '1px solid #ccc',
                  background: '#fff',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '4px',
                  outline: 'none',
                  padding: '20px', // İçerikle ilgili boşluk ayarı
                  width: '80%', // Modal genişliği
                  maxHeight: '80%', // Modal maksimum yükseklik
                  margin: '0 auto', // Modal'ı yatayda ortala
                },
              }}
            
        >
            <button
                className="modal-close-button"
                onClick={onRequestClose}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '20px',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                }}
            >
                &times;
            </button>
            {filteredData?.node && (
                <div className="p-4"> {/* Apply Tailwind CSS classes for padding */}
                <div className="font-bold text-xl mb-4">Repository Details</div> {/* Apply classes for styling */}
                <div>
                    <span className="font-semibold">Repository:</span> {filteredData?.node?.name}
                </div>
                <div>
                    <span className="font-semibold">Owner:</span> {filteredData?.node?.owner?.login}
                </div>
                <div>
                    <span className="font-semibold">Star:</span> {filteredData?.node?.stargazerCount}
                </div>
                <div>
                    <span className="font-semibold">Watchers:</span> {filteredData?.node?.watchers?.totalCount}
                </div>
                <div>
                    <span className="font-semibold">Primary Language:</span> {filteredData?.node?.primaryLanguage?.name}
                </div>
                <div>
                    <span className="font-semibold">Forks:</span> {filteredData?.node?.forks?.totalCount}
                </div>

                <div className="flex flex-col">
                <span className="font-semibold">Branches:</span>
                    {filteredData?.node?.refs?.edges?.map((ref: any) => (
                        <span>*{ref.node.name}  </span>
                    ))}
                </div>
            </div>
            )}

        </ReactModal>
    );
};

export default Modals;
