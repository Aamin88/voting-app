import "./elections.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ElectionCard } from "../../components";
import { IoGrid, IoList } from "react-icons/io5";
import useNav from "../../hooks/useNav";

function Elections() {
  const axiosPrivate = useAxiosPrivate();
  const { toogleGridView, setToogleGridView } = useNav();

  const handleElections = async function () {
    const res = await axiosPrivate.get("/api/v1/candidates");

    console.log(res);
  };

  const handleListView = function () {
    setToogleGridView(false);
    localStorage.setItem("election-card-view", JSON.stringify(toogleGridView));
  };

  const handleGridView = function () {
    setToogleGridView(true);
    localStorage.setItem("election-card-view", JSON.stringify(toogleGridView));
  };

  return (
    <div className="elections section__padding-md">
      <div className="elections__header">
        <h3 className="section__heading title__text">Elections</h3>
        <p className="section__text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
          veritatis deleniti optio asperiores velit eligendi! Aliquid repellat
          ipsam officiis fugit est architecto! Facere repellendus repudiandae
          magni maiores sapiente, omnis eius!
        </p>
      </div>

      {/* <div className="elections__filter">
        <div className="elections__filter-btns">
          <button
            className={`elections__view-btn ${!toogleGridView ? "active" : ""}`}
            onClick={handleListView}
          >
            <IoList />
          </button>
          <button
            className={`elections__view-btn ${toogleGridView ? "active" : ""}`}
            onClick={handleGridView}
          >
            <IoGrid />
          </button>
        </div>
      </div> */}

      <div className={`elections__content `}>
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
        <ElectionCard />
      </div>
    </div>
  );
}

export default Elections;
