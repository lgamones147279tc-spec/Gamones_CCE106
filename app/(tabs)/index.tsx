
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function Dashboard() {
  const { width } = useWindowDimensions();

  // Changes the card arrangement depending on screen width
  const isWideScreen = width >= 600;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>

        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>LG</Text>
          </TouchableOpacity>
        </View>

        
        <Text style={styles.sectionTitle}>Overview</Text>

        <View
          style={[
            styles.cardContainer,
            isWideScreen && styles.wideCardContainer,
          ]}
        >
          
          <View style={[styles.card, isWideScreen && styles.wideCard]}>
            <Text style={styles.cardLabel}>Total Balance</Text>
            <Text style={styles.cardValue}>₱25,480</Text>
            <Text style={styles.cardDescription}>
              Available balance
            </Text>
          </View>

          
          <View style={[styles.card, isWideScreen && styles.wideCard]}>
            <Text style={styles.cardLabel}>Expenses</Text>
            <Text style={styles.cardValue}>₱8,250</Text>
            <Text style={styles.cardDescription}>This month</Text>
          </View>

          
          <View style={[styles.card, isWideScreen && styles.wideCard]}>
            <Text style={styles.cardLabel}>Savings</Text>
            <Text style={styles.cardValue}>₱12,300</Text>
            <Text style={styles.cardDescription}>This month</Text>
          </View>
        </View>

        
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>＋</Text>
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>View Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💰</Text>
            <Text style={styles.actionText}>Add Savings</Text>
          </TouchableOpacity>
        </View>

        
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <View style={styles.activityBox}>
          
          <View style={styles.activityItem}>
            <View>
              <Text style={styles.activityTitle}>Food & Drinks</Text>
              <Text style={styles.activityDate}>
                Today, 10:30 AM
              </Text>
            </View>

            <Text style={styles.expense}>-₱250</Text>
          </View>

          
          <View style={styles.activityItem}>
            <View>
              <Text style={styles.activityTitle}>Transportation</Text>
              <Text style={styles.activityDate}>
                Yesterday, 5:20 PM
              </Text>
            </View>

            <Text style={styles.expense}>-₱120</Text>
          </View>

          
          <View style={styles.activityItem}>
            <View>
              <Text style={styles.activityTitle}>Monthly Savings</Text>
              <Text style={styles.activityDate}>
                September 8
              </Text>
            </View>

            <Text style={styles.income}>+₱2,000</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  content: {
    padding: 20,
    paddingTop: 50,
    maxWidth: 1000,
    width: "100%",
    alignSelf: "center",
  },

  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  greeting: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 14,
    marginTop: 10,
  },

  
  cardContainer: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 25,
  },

  wideCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    minHeight: 130,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  wideCard: {
    flex: 1,
    minWidth: 250,
  },

  cardLabel: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 12,
    color: "#999",
  },

  
  actionContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
  },

  actionButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  actionIcon: {
    fontSize: 24,
    marginBottom: 6,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  
  activityBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  activityTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },

  activityDate: {
    fontSize: 12,
    color: "#999",
  },

  expense: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#D9534F",
  },

  income: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E7D32",
  },
});

