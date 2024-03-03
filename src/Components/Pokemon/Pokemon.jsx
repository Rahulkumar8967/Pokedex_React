import './Pokemon.css'
function Pokemon({name, image}){
return (
<div className="Pokemon">
<div className='Pokemon-name'> {name} </div>
<div>
    <img className='Pokemon-image' src={image} />
    </div>
</div>


)
}