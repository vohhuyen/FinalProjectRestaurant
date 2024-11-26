import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';
import { ENDPOINTS } from '../../utils/endpoints';

const breadcrumbArrowSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.3 8.5">
    <polyline points="0.4 0.4 3.6 4.2 0.4 8.1" fill="" stroke="#FFFFFF" stroke-width="1"/>
    <polyline points="4.5 0.4 7.7 4.2 4.5 8.1" fill="none" stroke="#FFFFFF" stroke-width="1"/>
</svg>
`;

const BlogScreen: React.FC<any> = () => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(ENDPOINTS.GET_NEWS_ENDPOINT);
                setPosts(response.data);
            } catch (error: any) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#C9AB81" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    const handleImagePress = (post: any) => {
        navigation.navigate('BlogDetail', { post });
    };

    return (
        <ScrollView contentContainerStyle={styles.mainContent}>
            <View style={styles.card}>
                <View style={styles.breadcrumb}>
                    <Text style={styles.breadcrumbText}>Blog Classic</Text>
                </View>
                <View style={styles.postsContainer}>
                    <View style={styles.row}>
                        {posts.map((post, index) => (
                            <View key={index} style={styles.blogPost}>
                                <TouchableOpacity onPress={() => handleImagePress(post)}>
                                    <Image
                                        source={{ uri: post.image[0] }}
                                        style={styles.blogPostImage}
                                    />
                                </TouchableOpacity>
                                <View style={styles.postMeta}>
                                    <View style={styles.postDetails}>
                                        <Text style={styles.postDetailText}>{new Date(post.createdAt).toLocaleDateString()}</Text>
                                        <SvgXml xml={breadcrumbArrowSvg} width={16} height={16} style={styles.breadcrumbArrow} />
                                        <Text style={styles.postDetailText}>{post.type}</Text>
                                        <SvgXml xml={breadcrumbArrowSvg} width={16} height={16} style={styles.breadcrumbArrow} />
                                        <Text style={styles.postDetailText}>Diane Johnson</Text>
                                    </View>
                                </View>
                                <Text style={styles.postTitle}>{post.title}</Text>
                                <Text style={styles.postContent}>
                                    {post.content.substring(0, 100)}...
                                </Text>
                                <View style={styles.readMore}>
                                    <Text style={styles.readMoreText}>Read More</Text>
                                    <View style={styles.lines} />
                                    <View style={styles.lines} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContent: {
        padding: 10,
    },
    card: {
        flex: 1,
        backgroundColor: 'black',
    },
    breadcrumb: {
        marginTop: 20,
        marginLeft: 10,
    },
    breadcrumbText: {
        color: '#C9AB81',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    postsContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    blogPost: {
        width: '48%',
        marginBottom: 30,
        marginTop: 30,
    },
    blogPostImage: {
        width: '100%',
        height: 150,
    },
    postMeta: {
        marginTop: 10,
        padding: 5,
    },
    postDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    postDetailText: {
        color: 'white',
        marginRight: 5,
        flexShrink: 1,
    },
    breadcrumbArrow: {
        marginLeft: 4,
    },
    postTitle: {
        color: '#C9AB81',
        textTransform: 'uppercase',
        fontSize: 18,
        marginTop: 8,
    },
    postContent: {
        color: 'white',
        fontSize: 14,
        marginTop: 8,
    },
    readMore: {
        marginTop: 20,
    },
    readMoreText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 16,
    },
    lines: {
        backgroundColor: '#C9AB81',
        width: 100,
        height: 1,
        marginTop: 5,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
});

export default BlogScreen;
