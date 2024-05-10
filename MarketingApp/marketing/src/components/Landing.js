import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
//import { useCounterStore } from 'store/StoreApp';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link component={RouterLink} to="/" color="inherit">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StyledContainer = styled(Container)(({ theme }) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  //const { count, clear } = useCounterStore();

  return (
    <React.Fragment>
      <main>
        <Container maxWidth="sm" sx={{
          backgroundColor: 'background.paper',
          padding: 8,
        }}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Home Page
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely. 
          </Typography>
          <Button variant="contained" color="primary" >
            Clear Count
          </Button>
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
            <Grid item>
              <RouterLink to="/pricing">
                <Button variant="contained" color="primary">
                  Pricing
                </Button>
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/pricing">
                <Button variant="outlined" color="primary">
                  Pricing
                </Button>
              </RouterLink>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md" sx={{ paddingTop: 8, paddingBottom: 8 }}>
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }}  // 16:9
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer sx={{ backgroundColor: 'background.paper', padding: 6 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
