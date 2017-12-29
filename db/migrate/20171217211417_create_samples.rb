class CreateSamples < ActiveRecord::Migration[5.2]
  def change
    create_table :samples do |t|
      t.string :title
      t.string :body
      t.string :url
      t.text :tags
      t.references :account
      t.references :presentations

      t.timestamps
    end
  end
end
