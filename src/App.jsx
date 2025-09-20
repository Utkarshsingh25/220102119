

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, IconButton, Grid, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Log } from './utils/log';


const MAX_URLS = 5;
const DEFAULT_VALIDITY = 30;

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function UrlShortenerPage() {
  const [urls, setUrls] = useState([
    { url: '', validity: DEFAULT_VALIDITY, shortcode: '', error: '' },
  ]);
  const [results, setResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (idx, field, value) => {
    const newUrls = urls.map((item, i) =>
      i === idx ? { ...item, [field]: value, error: '' } : item
    );
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < MAX_URLS) {
      setUrls([...urls, { url: '', validity: DEFAULT_VALIDITY, shortcode: '', error: '' }]);
      Log('frontend', 'info', 'component', 'Added new URL input field');
    }
  };

  const removeUrlField = (idx) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== idx));
      Log('frontend', 'info', 'component', 'Removed a URL input field');
    }
  };

  const validateFields = () => {
    let valid = true;
    const newUrls = urls.map((item) => {
      let error = '';
      if (!item.url || !validateUrl(item.url)) {
        error = 'Enter a valid URL';
        valid = false;
      } else if (item.validity && (!/^[0-9]+$/.test(item.validity) || parseInt(item.validity) <= 0)) {
        error = 'Validity must be a positive integer';
        valid = false;
      } else if (item.shortcode && !/^[a-zA-Z0-9]+$/.test(item.shortcode)) {
        error = 'Shortcode must be alphanumeric';
        valid = false;
      }
      return { ...item, error };
    });
    setUrls(newUrls);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults([]);
    if (!validateFields()) {
      Log('frontend', 'warn', 'component', 'Validation failed on form submit');
      return;
    }
    setSubmitting(true);
    try {
      // Simulate API call and log
      Log('frontend', 'info', 'component', 'Submitting URL shortening request');
      // Replace with actual API call
      setTimeout(() => {
        setResults(urls.map((item, i) => ({
          shortUrl: `http://short.url/${item.shortcode || 'abc' + (i + 1)}`,
          expiry: `${item.validity || DEFAULT_VALIDITY} min`,
          original: item.url,
        })));
        setSubmitting(false);
        Log('frontend', 'info', 'component', 'Shortening successful');
      }, 1000);
    } catch (err) {
      Log('frontend', 'error', 'component', 'Shortening failed: ' + err.message);
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {urls.map((item, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper sx={{ p: 2, mb: 1 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      label="Long URL"
                      value={item.url}
                      onChange={e => handleChange(idx, 'url', e.target.value)}
                      fullWidth
                      error={!!item.error}
                      helperText={item.error}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      label="Validity (min)"
                      value={item.validity}
                      onChange={e => handleChange(idx, 'validity', e.target.value)}
                      fullWidth
                      type="number"
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <TextField
                      label="Custom Shortcode"
                      value={item.shortcode}
                      onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <IconButton onClick={() => addUrlField()} disabled={urls.length >= MAX_URLS} color="primary">
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => removeUrlField(idx)} disabled={urls.length <= 1} color="error">
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={submitting}>
            {submitting ? 'Shortening...' : 'Shorten URLs'}
          </Button>
        </Box>
      </form>
      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened URLs</Typography>
          {results.map((res, i) => (
            <Paper key={i} sx={{ p: 2, mb: 1 }}>
              <Typography>Original: {res.original}</Typography>
              <Typography>Short: <a href={res.shortUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a></Typography>
              <Typography>Expires in: {res.expiry}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
}

function StatisticsPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      {/* TODO: Add stats here */}
      <Typography>Statistics coming soon...</Typography>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
          <Button color="inherit" component={Link} to="/">Shortener</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
