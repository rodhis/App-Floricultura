import { useState } from "react";
import { useDispatch } from "react-redux";
import { plantsActions } from "../../store/plants/plantsSlice";
import { getPlants } from "../../store/plants/plantsAction";
import Input from "../../components/UI/Input/Input";
import plant from "../../assets/plantForm.svg";

import styles from "./Register.module.css";

const Register = () => {
  const [plantName, setPlantName] = useState("");
  const [plantSubtitle, setPlantSubtitle] = useState("");
  const [plantType, setPlantType] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [label, setLabel] = useState("indoor");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  async function updateStatePlants() {
    const data = await getPlants();
    dispatch(plantsActions.handleGetPlants(data));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!plantName) {
      validationErrors.plantName = "Plant Name is required";
    }
    if (!plantSubtitle) {
      validationErrors.plantSubtitle = "Plant Subtitle is required";
    }
    if (!plantType) {
      validationErrors.plantType = "Plant Type is required";
    }
    if (!price) {
      validationErrors.price = "Price is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const myData = new FormData(e.target);

      let isInSale;
      const data = Object.fromEntries(myData.entries());
      const {
        description,
        discountPercentage,
        features,
        labelDoor,
        name,
        plantType,
        price,
        subtitle,
      } = data;

      if (discountPercentage > 0) {
        isInSale = "promo";
      } else {
        isInSale = "notPromo";
      }

      console.log(description);
      console.log(data);

      const plantsObject = {
        name: name,
        subtitle: subtitle,
        label: [plantType, labelDoor],
        isInSale,
        price: price,
        discountPercentage: discountPercentage,
        features: features,
        description: description,
      };

      fetch("http://localhost:3000/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(plantsObject),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Form submitted successfully");

            updateStatePlants();

            e.target.reset();
            setErrors({});
          } else {
            throw new Error("Failed to submit form");
          }
        })
        .catch((error) => {
          console.error("Form submission error:", error);
        });
    }
  };

  return (
    <>
      <section className={styles.registerContainer}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.registerTitle}>Plant Registration</h2>
          <Input
            id={"name"}
            name={"name"}
            placeholder={"Echinocereus Cactus"}
            label={"Plant Name"}
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            erroMsg={errors.plantName}
          />
          <Input
            id={"subtitle"}
            name={"subtitle"}
            placeholder={"A majestic addition to your plant collection"}
            label={"Plant Subtitle"}
            value={plantSubtitle}
            onChange={(e) => setPlantSubtitle(e.target.value)}
            erroMsg={errors.plantSubtitle}
          />
          <div>
            <label>
              Plant Type:
              <input
                type="text"
                value={plantType}
                onChange={(e) => setPlantType(e.target.value)}
                name="plantType"
              />
              {errors.plantType && <span>{errors.plantType}</span>}
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name="price"
              />
              {errors.price && <span>{errors.price}</span>}
            </label>
            <label>
              Discount Percentage:
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                name="discountPercentage"
              />
              {errors.discountPercentage && (
                <span>{errors.discountPercentage}</span>
              )}
            </label>
          </div>
          <div>
            <span>Label:</span>
            <label>
              Indoor
              <input
                type="radio"
                value="indoor"
                checked={label === "indoor"}
                onChange={() => setLabel("indoor")}
                name="labelDoor"
              />
            </label>
            <label>
              Outdoor
              <input
                type="radio"
                value="outdoor"
                checked={label === "outdoor"}
                onChange={() => setLabel("outdoor")}
                name="labelDoor"
              />
            </label>
          </div>
          <div>
            <label>
              Features:
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                name="features"
              />
              {errors.features && <span>{errors.features}</span>}
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
              />
              {errors.description && <span>{errors.description}</span>}
            </label>
          </div>
          <button type="submit">Register</button>
        </form>

        <figure>
          <img src={plant} alt="A model plant" />
        </figure>
      </section>
    </>
  );
};

export default Register;
