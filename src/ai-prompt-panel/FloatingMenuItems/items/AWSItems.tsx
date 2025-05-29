import { Bold, Italic, Strikethrough, Code, Pilcrow, List, ListOrdered, Quote, Heading1, Heading2, Heading3, LinkIcon, Image as ImageIcon, Minus } from 'lucide-react';

import { FloatingMenuItem } from '../FloatingMenuItem';

export const AWSItems =  [
        FloatingMenuItem.instance()
            .setTrigger('aws://')
            
            .setId('awsResource')
            .setLabel('AWS Resource')
            .setIcon(<Code size={16} />)
            .setTemplate('☁️ **AWS EC2** - Resource configuration needed'),

        FloatingMenuItem.instance()
        .setTrigger('aws://')
            .setId('awsCommand')
            .setLabel('AWS CLI Command')
            .setIcon(<Pilcrow size={16} />)
            .setTemplate(`\`\`\`bash
aws s3 ls
aws ec2 describe-instances
aws lambda list-functions
\`\`\``),

        FloatingMenuItem.instance()
        .setTrigger('aws://')
            .setId('awsPolicy')
            .setLabel('IAM Policy')
            .setIcon(<Quote size={16} />)
            .setTemplate(`\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::bucket-name/*"]
    }
  ]
}
\`\`\``)
    ];
