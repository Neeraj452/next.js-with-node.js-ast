import styles from "../page.module.css";
const CustomModal = ({ isOpen, onClose, children }) => {
    if(!isOpen) return null;

    return (<>
            <div className={styles.customModal} onClick={onClose}></div>
            <div className={styles.modal_content}>
                <div className="box">
                    {children}
                </div>
            </div>
            </>
    );
}
export default CustomModal;