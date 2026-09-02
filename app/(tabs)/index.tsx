import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [firstNumber, setFirstNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [message, setMessage] = useState("");

  // Select operator
  const selectOperator = (op: string) => {
    // Check if input is empty
    if (input.trim() === "") {
      setMessage("Please enter a number.");
      return;
    }

    const number = Number(input);

    // Check if input is invalid
    if (Number.isNaN(number)) {
      setMessage("Please enter a valid number.");
      return;
    }

    // Save the first number
    setFirstNumber(input);

    // Save the operator
    setOperator(op);

    // Clear input for second number
    setInput("");

    // Clear message
    setMessage("");
  };

  // Calculate result
  const calculate = () => {
    // Check first number
    if (firstNumber === "") {
      setMessage("Please enter the first number.");
      return;
    }

    // Check operator
    if (operator === "") {
      setMessage("Please select an operator.");
      return;
    }

    // Check second number
    if (input.trim() === "") {
      setMessage("Please enter the second number.");
      return;
    }

    const num1 = Number(firstNumber);
    const num2 = Number(input);

    // Validate numbers
    if (Number.isNaN(num1) || Number.isNaN(num2)) {
      setMessage("Please enter valid numbers.");
      return;
    }

    // Prevent division by zero
    if (operator === "/" && num2 === 0) {
      setMessage("Cannot divide by zero.");
      return;
    }

    let answer = 0;

    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;

      case "-":
        answer = num1 - num2;
        break;

      case "*":
        answer = num1 * num2;
        break;

      case "/":
        answer = num1 / num2;
        break;
    }

    // Display result inside the input box
    setInput(answer.toString());

    // Clear first number and operator
    setFirstNumber("");
    setOperator("");

    // Clear error message
    setMessage("");
  };

  // Clear calculator
  const clearCalculator = () => {
    setInput("");
    setFirstNumber("");
    setOperator("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      {/* ONE INPUT BOX */}
      <TextInput
        style={styles.input}
        placeholder={
          operator === ""
            ? "Enter number"
            : "Enter second number"
        }
        keyboardType="numeric"
        value={input}
        onChangeText={(text) => {
          setInput(text);
          setMessage("");
        }}
      />

      {/* Show selected operator */}
      {operator !== "" && (
        <Text style={styles.operation}>
          {firstNumber} {operator}
        </Text>
      )}

      {/* Operator Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => selectOperator("+")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => selectOperator("-")}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => selectOperator("*")}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => selectOperator("/")}
        >
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      {/* Equals Button */}
      <TouchableOpacity
        style={styles.equalsButton}
        onPress={calculate}
      >
        <Text style={styles.equalsText}>=</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {message !== "" && (
        <Text style={styles.error}>{message}</Text>
      )}

      {/* Clear Button */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearCalculator}
      >
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 18,
    fontSize: 28,
    textAlign: "right",
    marginBottom: 10,
  },

  operation: {
    fontSize: 20,
    textAlign: "right",
    marginBottom: 15,
    color: "#555",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#333",
    width: 65,
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },

  equalsButton: {
    backgroundColor: "#007AFF",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  equalsText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15,
  },

  clearButton: {
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  clearText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});