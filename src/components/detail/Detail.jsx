import "./Detail.scss";
import { arrowDown, arrowUp, avatar, bg5, download } from "../../../public";
import { auth } from "../../lib/firebase";
const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src={avatar} alt="" />
        <h2>Deepak</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src={arrowDown} alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetails">
                <img src={bg5} alt="" />
                <span>photo_2024.jpg</span>
              </div>
              <img src={download} alt="" className="download" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img src={bg5} alt="" />
                <span>photo_2024.jpg</span>
              </div>
              <img src={download} alt="" className="download" />
            </div>
            <div className="photoItem">
              <div className="photoDetails">
                <img src={bg5} alt="" />
                <span>photo_2024.jpg</span>
              </div>
              <img src={download} alt="" className="download" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>shared File</span>
            <img src={arrowUp} alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={()=>auth.signOut()}>Log Out</button>


      </div>
    </div>
  );
};

export default Detail;
