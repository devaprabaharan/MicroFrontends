import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useStore } from 'store/StoreApp';

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const {count, increment, clear} = useStore();
  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          padding: (theme) => theme.spacing(8, 0, 6),
        }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Home Page
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div sx={{ marginTop: (theme) => theme.spacing(4) }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button component={RouterLink} to="/pricing" variant="contained" color="primary">
                    Pricing
                  </Button>
                  <Button color="primary" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={increment} >Counter: {count} </Button>
                </Grid>
                <Grid item>
                  <Button component={RouterLink} to="/pricing" variant="outlined" color="primary">
                    Pricing
                  </Button>
                  <Button color="primary" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={clear} >ClearCount</Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container sx={{ paddingTop: (theme) => theme.spacing(8), paddingBottom: (theme) => theme.spacing(8) }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }} // 16:9
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
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
      {/* Footer */}
      <footer sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        padding: (theme) => theme.spacing(6),
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        marginTop: (theme) => theme.spacing(8),
      }}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
