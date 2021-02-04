import TagManager, { TagManagerArgs } from 'react-gtm-module';

export class TagManagerService {
  private static tagManagerArgs: TagManagerArgs = {
    gtmId: 'GTM-W2CB8BQ'
  };

  public static initialize(): void {
    TagManager.initialize(this.tagManagerArgs);
  }

  public static pushEvent(event: string): void {
    TagManager.dataLayer({ dataLayer: { event } });
  }
}
