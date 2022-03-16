import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditPost from '../EditPost//EditPost';
import Modal from 'react-modal';
import './OnePost.css'

const OnePostModal = ({postId, user, closeModal,singlePost}) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
      }

    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      };

    return (
        <div id="single-post-">
          <div >
            <div>
              <div className="header-comment single-post">
                <img className="lft-img" src={singlePost?.image} />
                <div className="right-bar wid">
                  <div className="child1">
                    <h2>{user?.username} header</h2>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      overlayClassName="modal-delete"
                    >
                    <EditPost closeModal={closeModal} postId={postId} postImg={singlePost?.image} />
                    </Modal>
                    <button onClick={openModal} >edit post</button>
                  </div>
                  <div className="child2">
                    <h2>comments box</h2>
                    <p>{singlePost?.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };



export default OnePostModal;
