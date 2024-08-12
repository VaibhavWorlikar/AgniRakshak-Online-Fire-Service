import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';

const Resources = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [videos, setVideos] = useState([]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(URL.createObjectURL(file)); // Create a local URL for preview
        }
    };

    const handleUpload = () => {
        if (videoFile) {
            setVideos([...videos, { url: videoFile, title: `Video ${videos.length + 1}` }]); // Add the video to the list
            setVideoFile(null); // Clear the file input
        }
    };

    return (
        <PageContainer id='resources'>
            <ContentContainer>
                <Title>Safety Resources</Title>
                <UploadSection>
                    <Input type="file" accept="video/*" onChange={handleFileChange} />
                    <UploadButton onClick={handleUpload}>Upload Video</UploadButton>
                </UploadSection>
                <CardContainer>
                    {videos.map((video, index) => (
                        <StyledCard key={index}>
                            <Card.Body>
                                <Card.Title>{video.title}</Card.Title>
                                <Video controls>
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </Video>
                            </Card.Body>
                        </StyledCard>
                    ))}
                </CardContainer>
            </ContentContainer>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    background-color: #f0f0f0; /* Light background color */
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`;

const UploadSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const Input = styled.input`
    margin-bottom: 10px;
`;

const UploadButton = styled(Button)`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #fe6434;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #e5532d;
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const StyledCard = styled(Card)`
    width: 18rem;
    margin: 10px;
`;

const Video = styled.video`
    width: 100%;
    height: auto;
    border-radius: 5px;
`;

export default Resources;
