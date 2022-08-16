import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CodingDisplay from "./CodingDisplay";
import ListStyleWrapper from "../ListStyleWrapper";
import AddIcon from "@mui/icons-material/Add";

type CodeableConceptProps = {
  value?: fhir4.CodeableConcept;
  updateValue: (val: fhir4.CodeableConcept) => void;
};

export default function CodeableConcept({
  value,
  updateValue,
}: CodeableConceptProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [nextCoding, setNextCoding] = useState<fhir4.Coding | null>(null);

  const handleCodeChange = (e: any) => {
    const val = e.target.value;
    setNextCoding({
      ...nextCoding,
      code: val,
    });
  };

  const handleSystemChange = (e: any) => {
    const val = e.target.value;
    setNextCoding({
      ...nextCoding,
      system: val,
    });
  };

  const handleDisplayChange = (e: any) => {
    const val = e.target.value;
    setNextCoding({
      ...nextCoding,
      display: val,
    });
  };

  const onAddCode = () => {
    setIsAdding(true);
    setNextCoding({
      code: "",
      display: "",
      system: "",
    });
  };

  useEffect(() => {
    if (!value || !value.coding || value.coding.length === 0) {
      onAddCode();
    }
  }, []);

  const onCancel = () => {
    setIsAdding(false);
    setNextCoding(null);
  };

  const coding = value?.coding || [];

  const onCreateCode = () => {
    const nextCodingArr = [...(value?.coding || [])];

    if (nextCoding) {
      nextCodingArr.push(nextCoding);
    }

    updateValue({
      ...(value || {}),
      coding: nextCodingArr,
    });
    onCancel();
  };

  return (
    <Box>
      <ListStyleWrapper>
        {coding.map((codingRow) => (
          <Box component="li" className="dark">
            <Box sx={{ paddingBottom: "4px" }}>
              <CodingDisplay coding={codingRow} />
            </Box>
          </Box>
        ))}

        {!isAdding && (
          <Box
            component="li"
            className="dark"
            onClick={onAddCode}
            sx={{
              fontSize: "13px",
              color: "rgb(130,130,130)",
              // paddingTop: "5px",
              cursor: "pointer",
            }}
          >
            <Chip
              label="Add Code"
              size="small"
              sx={{
                marginTop: "5px",
                background: "#BBDEFB",
                fontSize: "11px",
                color: "#0D47A1",
              }}
              icon={<AddIcon sx={{ fontSize: "20px" }} />}
            />
          </Box>
        )}
      </ListStyleWrapper>

      {isAdding && nextCoding && (
        <Box
          sx={{
            marginTop: "5px",
            borderRadius: "5px",
            padding: "7px",
            border: "1px solid rgb(230,230,230)",
          }}
        >
          <Box>
            <TextField
              size="small"
              value={nextCoding.code}
              onChange={handleCodeChange}
              label="Code"
              fullWidth
            />
          </Box>
          <Box sx={{ paddingTop: "7px" }}>
            <TextField
              size="small"
              value={nextCoding.system}
              onChange={handleSystemChange}
              label="System"
              fullWidth
            />
          </Box>
          <Box sx={{ paddingTop: "7px" }}>
            <TextField
              size="small"
              value={nextCoding.display}
              onChange={handleDisplayChange}
              label="Display"
              fullWidth
            />
          </Box>
          <Button
            onClick={onCreateCode}
            size="small"
            variant="contained"
            sx={{ marginTop: "5px" }}
          >
            Create Code
          </Button>

          <Button
            onClick={onCancel}
            size="small"
            sx={{ marginTop: "5px", marginLeft: "5px" }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
}
