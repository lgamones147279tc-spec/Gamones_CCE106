import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch a random quote
  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError("");

      // Generate a random quote ID
      const randomId = Math.floor(Math.random() * 30) + 1;

      const response = await fetch(
        `https://dummyjson.com/quotes/${randomId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await response.json();

      // Save API data into state
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.log("API Error:", error);

      setError("Unable to load quote. Please try again.");
      setQuote("");
      setAuthor("");
    } finally {
      setLoading(false);
    }
  };

  // Run once when the app starts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>
          QUOTE OF THE DAY
        </Text>

        {/* Quote Card */}
        <View style={styles.card}>

          {/* Loading State */}
          {loading && (
            <View style={styles.center}>
              <ActivityIndicator
                size="large"
                color="#4F46E5"
              />

              <Text style={styles.loadingText}>
                Loading quote...
              </Text>
            </View>
          )}

          {/* Error State */}
          {!loading && error !== "" && (
            <View style={styles.center}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}

          {/* Success State */}
          {!loading && error === "" && quote !== "" && (
            <View>
              <Text style={styles.quote}>
                "{quote}"
              </Text>

              <Text style={styles.author}>
                — {author}
              </Text>
            </View>
          )}

          {/* Empty State */}
          {!loading && error === "" && quote === "" && (
            <View style={styles.center}>
              <Text style={styles.emptyText}>
                No quote available.
              </Text>
            </View>
          )}

        </View>

        {/* New Quote Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={fetchQuote}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "LOADING..." : "NEW QUOTE"}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    minHeight: 250,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.10,
    shadowRadius: 8,

    elevation: 5,
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  quote: {
    fontSize: 24,
    lineHeight: 36,
    fontStyle: "italic",
    textAlign: "center",
    color: "#1F2937",
  },

  author: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "right",
    marginTop: 25,
    color: "#4F46E5",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#6B7280",
  },

  errorText: {
    fontSize: 17,
    color: "#DC2626",
    textAlign: "center",
    lineHeight: 25,
  },

  emptyText: {
    fontSize: 17,
    color: "#6B7280",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
