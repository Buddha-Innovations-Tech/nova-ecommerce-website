import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function TestimonialsRating({Rate}){
    return(
        <>
         <Stack spacing={1}>
      <Rating  defaultValue={Rate} precision={0.5} readOnly  size='small' sx={{ color: '#276CAD' }}/>
    </Stack>
        </>
    )
}

export default TestimonialsRating;