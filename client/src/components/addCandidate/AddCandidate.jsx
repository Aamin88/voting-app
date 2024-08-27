import "./addcandidateform.css";
import { useState } from "react";

const AddCandidateForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // closeModal();
  };

  return (
    <div>
      <div className="addcandidate">
        <div className="addcandidate__modal">
          <div className="addcandidate__modal-title">
            <h2 className="section__heading">Create an election</h2>
            <p className="section__text lead__text">
              Fill in all required field to create election
            </p>
          </div>

          <form onSubmit={handleSubmit} className="addcandidate__form">
            <div className="addcandidate__form-details">
              <div className="addcandidate__form-details_control">
                <span className="details">Full Name</span>
                <input type="text" placeholder="E.g: John Smith" required />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Full Name</span>
                <input type="text" placeholder="E.g: John Smith" required />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Full Name</span>
                <input type="text" placeholder="E.g: John Smith" required />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Full Name</span>
                <input type="text" placeholder="E.g: John Smith" required />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Full Name</span>
                <input type="text" placeholder="E.g: John Smith" required />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Username</span>
                <input type="text" placeholder="johnWC98" required />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Email</span>
                <input
                  type="email"
                  placeholder="johnsmith@hotmail.com"
                  required
                />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Phone Number</span>
                <input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="012-345-6789"
                  required
                />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Password</span>
                <input type="password" placeholder="********" required />
              </div>
              <div className="addcandidate__form-details_control">
                <span className="details">Confirm Password</span>
                <input type="password" placeholder="********" required />
              </div>
            </div>
            <div className="gender__details">
              <input type="radio" name="gender" id="dot-1" />
              <input type="radio" name="gender" id="dot-2" />
              <input type="radio" name="gender" id="dot-3" />
              <span className="gender__title">Gender</span>

              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span>Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span>Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span>Prefer not to say</span>
                </label>
              </div>
            </div>
            <div className="button">
              <button type="submit">Submit</button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateForm;
