import { ILyricSegment } from 'Contexts/Lyric'

enum SyncType {
	LineSynced = 'LINE_SYNCED',
	Unsynced = 'UNSYNCED',
	Synced = 'SYNCED',
}

type IResponse =
	| {
			error: true
			message: string
	  } // eslint-disable-line no-mixed-spaces-and-tabs
	| {
			error: false
			syncType: SyncType
			lines: {
				startTimeMs: string
				words: string
				syllables: []
				endTimeMs: string
			}[]
	  } // eslint-disable-line no-mixed-spaces-and-tabs

const SpotifyToLyricSegments = async (
	spotifyTrackID: string,
): Promise<[false, ILyricSegment[]] | [true, string]> => {
	if (spotifyTrackID === '')
		return [true, 'url or trackid parameter is required!']

	const req = await fetch(
		`https://spotify-lyric-api.herokuapp.com/?trackid=${spotifyTrackID}&format=id3`,
	)

	const data = (await req.json()) as IResponse

	if (data.error) return [true, data.message]

	if (data.syncType !== SyncType.LineSynced)
		return [true, 'Only support line synced lyric']

	return [
		false,
		data.lines.map(line => ({
			id: crypto.randomUUID(),
			timeStartMS: parseInt(line.startTimeMs, 10),
			words: line.words,
		})),
	]
}

export default SpotifyToLyricSegments
