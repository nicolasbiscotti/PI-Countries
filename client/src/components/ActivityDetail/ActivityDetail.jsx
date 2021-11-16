export default function ActivityDetail({
  name,
  difficulty,
  durationTime,
  season,
}) {
    return <div id="activity-detail-wrap">
        <h2>{name}</h2>
        <h3>To do in: {season}</h3>
        <h4>Difficulty: {difficulty}</h4>
        <h4>Duration: {durationTime}</h4>
    </div>
}
