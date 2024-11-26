import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';

const BlogDetails: React.FC<any> = () => {
  const route = useRoute();
  const { post } = route.params; 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSpacer} />
      <View style={styles.content}>
        <Image
          source={{ uri: post.image[0] }}
          style={styles.image}
        />
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>Diane Johnson</Text>
          <Text style={styles.metaSeparator}>•</Text>
          <Text style={styles.metaText}>{new Date(post.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.metaSeparator}>•</Text>
          <Text style={styles.metaText}>{post.type}</Text>
        </View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.contentText}>{post.content}</Text>
        {post.image && post.image.length > 1 && (
          <Image source={{ uri: post.image[1] }} style={styles.image} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  headerSpacer: {
    height: 200,
  },
  content: {
    padding: 16,
    marginLeft: 52,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaText: {
    color: "white",
    fontSize: 14,
  },
  metaSeparator: {
    color: "white",
    marginHorizontal: 4,
  },
  title: {
    fontSize: 24,
    color: "#C9AB81",
    textTransform: "uppercase",
    marginBottom: 16,
    letterSpacing: 2,
  },
  contentText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});

export default BlogDetails;
