import React, { Component } from 'react'
import axios from 'axios'

import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Paper from '@material-ui/core/Paper'

const styles = {
  card: {
    maxWidth: '60%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}

class WineRecommendations extends Component {
  constructor (props) {
    super(props)

    this.state = {
      wineType: '',
      recommendations: [],
      expanded: false
    }
  }

  componentDidMount () {
    axios(`https://api.spoonacular.com/food/wine/recommendation?wine=${this.props.match.params.wine}&number=10&apiKey=6447eeed093f4db6a0690426c5319196`)
      .then(res => {
        console.log(res.data.recommendedWines)
        this.setState({ recommendations: res.data.recommendedWines, wineType: this.props.match.params.wine })
      })
      .catch(console.err)
  }

  handleExpandClick = (event) => {
    event.preventDefault()
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    return (
      <div>
        <Paper>
          <h2>{this.state.wineType} recommendations</h2>
          {this.state.recommendations.map((wine, index) =>
            <div key={index}>
              <Card style={styles.card}>
                <CardHeader
                  title={wine.title}
                />
                <CardMedia
                  style={styles.media}
                  image={wine.imageUrl}
                  title="wine image"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Learn More
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(styles.expand, {
                      [styles.expandOpen]: this.state.expanded
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Description:</Typography>
                    <Typography paragraph>
                      {wine.description}
                    </Typography>
                    <Typography paragraph>Average Score:</Typography>
                    <Typography paragraph>
                      {wine.score.toString().slice(0, 4)}
                    </Typography>
                    <Typography paragraph>
                      Price:
                    </Typography>
                    <Typography paragraph>
                      {wine.price}
                    </Typography>
                    <Typography paragraph>
                      Buy me!
                    </Typography>
                    <Typography paragraph>
                      {wine.link}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          )}
        </Paper>
      </div>
    )
  }
}

export default WineRecommendations
