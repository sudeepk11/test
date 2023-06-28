import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Chip } from '@mui/material';


function FlickrPhotoViewer() {
  const [photos, setPhotos] = useState([]);
  // hardcoded stuff too bad practice! will change
  const API_URL = 'http://localhost:4200/api/flickr';

  useEffect(() => {
    fetchFlickrData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // for search queryy.
  const filteredPhotos = photos.filter((photo) =>
    photo.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function fetchFlickrData() {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();

      const fetchedPhotos = jsonData.items.map(item => ({
        title: item.title,
        link: item.link,
        media: item.media.m,
        date_taken: item.date_taken,
        description: item.description,
        published: item.published,
        author: item.author,
        author_id: item.author_id,
        tags: item.tags,
      }));

      setPhotos(fetchedPhotos);
    } catch (error) {
      console.error('Error fetching data from Flickr:', error);
    }
  }
  

        

    return (
      <div style={{ padding: '16px' }}>
         <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by tags"

        />
      </div>
      <h1 style={{ textAlign: 'center' }}>Flickr Photo Viewer</h1>
   
     
      <Grid container spacing={2}>
        {filteredPhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.link}>
            <Card
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <CardMedia
                component="img"
                style={{
                  height: '100%',
                  objectFit: 'cover',
                }}
                image={photo.media}
                alt={photo.title}
              />
              <CardContent>
                <Typography variant="h6">{photo.title}</Typography>
                <div style={{ marginTop: '8px' }}>
                  {photo.tags.split(' ').map((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                      <Chip
                        key={tag}
                        label={tag}
                        style={{ marginRight: '4px', backgroundColor: 'yellow' }}
                      />
                    ) : (
                      <Chip key={tag} label={tag} style={{ marginRight: '4px' }} />
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
      
      );

}

export default FlickrPhotoViewer;
