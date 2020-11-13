import { MediastackData } from './mediastackdata'
import { NewsCatcherData } from './newscatcherdata'

export class Data {
    author: string
    title: string
    description: string
    url: string
    source: string
    image: string
    category: string
    publicationDate: string

    getDataFromMediastack(mdata: MediastackData): Data{
      var data: Data;
      data.author = mdata.author
      data.title = mdata.title
      data.description = mdata.description
      data.url = mdata.url
      data.source = mdata.source
      data.image = mdata.image
      data.category = mdata.category
      data.publicationDate = mdata.published_at
      return data;
    }


}
