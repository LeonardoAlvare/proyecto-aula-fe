// import { Button } from "primereact/button";
// import { FloatLabel } from "primereact/floatlabel";
// import { InputText } from "primereact/inputtext";
// import { useNavigate } from "react-router-dom";

// function Predictions() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div className="col-span-2">
//         <Button
//           icon="pi pi-arrow-left"
//           className="mb-4"
//           label="Volver"
//           text
//           onClick={() => navigate("/")}
//         />
//       </div>

//       <form className="flex flex-col gap-8">
//         <div>
//           <FloatLabel>
//             <InputText
//               id="experience-required"
//               name="experience-required"
//               className="w-full"
//             />
//             <label htmlFor="experience-required">Experience Required</label>
//           </FloatLabel>
//         </div>

//         <div>
//           <FloatLabel>
//             <InputText
//               id="proposals-received"
//               name="proposals-received"
//               className="w-full"
//             />
//             <label htmlFor="proposals-received">Proposals Received</label>
//           </FloatLabel>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Predictions;

import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Predictions() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    requiredExperience: "",
    proposalsReceived: "",
    popularidadCreator: "",
    category: "",
    academicTraining: "",
  });

  const [predictionResult, setPredictionResult] = useState<{
    prediccion: string;
    probabilidades: Record<string, number>;
  } | null>(null);

  const experienceOptions = [
    { label: "Junior", value: "junior" },
    { label: "Semi-Senior", value: "semi-senior" },
    { label: "Senior", value: "senior" },
  ];

  const levelOptions = [
    { label: "Bajo", value: "bajo" },
    { label: "Medio", value: "medio" },
    { label: "Alto", value: "alto" },
  ];

  const categoryOptions = [
    { label: "Backend", value: "backend" },
    { label: "Frontend", value: "frontend" },
    { label: "Mobile", value: "mobile" },
    { label: "Nube", value: "nube" },
    { label: "Web", value: "web" },
  ];

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);

    try {
      const response = await fetch(
        "http://localhost:8080/api/prediccion/realizar-prediccion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error en la predicción");

      const data = await response.json();
      console.log("Respuesta:", data);
      setPredictionResult(data);
    } catch (error) {
      console.error("Error al hacer la predicción:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="col-span-2">
        <Button
          icon="pi pi-arrow-left"
          className="mb-4"
          label="Volver"
          text
          onClick={() => navigate("/")}
        />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FloatLabel>
          <Dropdown
            inputId="requiredExperience"
            value={formData.requiredExperience}
            options={experienceOptions}
            onChange={(e) =>
              handleDropdownChange("requiredExperience", e.value)
            }
            className="w-full"
          />
          <label htmlFor="requiredExperience">Experiencia Requerida</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="proposalsReceived"
            value={formData.proposalsReceived}
            options={levelOptions}
            onChange={(e) => handleDropdownChange("proposalsReceived", e.value)}
            className="w-full"
          />
          <label htmlFor="proposalsReceived">Propuestas Recibidas</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="popularidadCreator"
            value={formData.popularidadCreator}
            options={levelOptions}
            onChange={(e) =>
              handleDropdownChange("popularidadCreator", e.value)
            }
            className="w-full"
          />
          <label htmlFor="popularidadCreator">Popularidad del Creador</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="category"
            value={formData.category}
            options={categoryOptions}
            onChange={(e) => handleDropdownChange("category", e.value)}
            className="w-full"
          />
          <label htmlFor="category">Categoría</label>
        </FloatLabel>

        <FloatLabel>
          <Dropdown
            inputId="academicTraining"
            value={formData.academicTraining}
            options={categoryOptions}
            onChange={(e) => handleDropdownChange("academicTraining", e.value)}
            className="w-full"
          />
          <label htmlFor="academicTraining">Formación Académica</label>
        </FloatLabel>

        <Button type="submit" label="Realizar predicción" icon="pi pi-send" />
      </form>

      {predictionResult && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">
            Resultado de la predicción:
          </h3>
          <p>
            <strong>Predicción:</strong> {predictionResult.prediccion}
          </p>
          <ul>
            {Object.entries(predictionResult.probabilidades).map(
              ([label, prob]) => (
                <li key={label}>
                  <strong>{label}:</strong> {prob}%
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Predictions;
