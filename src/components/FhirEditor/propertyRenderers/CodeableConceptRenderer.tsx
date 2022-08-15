import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

type CodeableConceptProps = {
  value?: fhir4.CodeableConcept;
  updateValue: (val: string) => void;
};

export default function CodeableConcept({
  value,
  updateValue,
}: CodeableConceptProps) {
  const handleDateChange = (newDate: any) => {
    const dateStr = newDate.toJSON();
    console.log(newDate, dateStr);
    updateValue(dateStr);
  };

  const coding = value?.coding || [];

  const codingViews = coding.map((codingRow) => {
    return (
      <Box>
        {codingRow.code} - {codingRow.display} - {codingRow.system}
      </Box>
    );
  });

  return <Box>{codingViews}</Box>;
}
